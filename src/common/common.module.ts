import { Module, NestModule, MiddlewareConsumer, Global } from '@nestjs/common';
import {
	APP_FILTER,
	APP_PIPE,
	APP_INTERCEPTOR,
	APP_GUARD,
	HttpAdapterHost,
} from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { securityMiddleware } from './middlewares/security.middleware';
import { cookieMiddleware } from './middlewares/cookie.middleware';
import { SessionMiddleware } from './middlewares/session.middleware';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { globalValidationPipe } from './pipes/validation.pipe';
// import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { GlobalThrottlerGuard } from './guards/throttle.guard';
import * as ms from 'ms';
import { prismaExceptionFilter } from './filters/prisma-exception.filter';
import { RedisModule } from './redis/redis.module';
import { PrismaModule } from 'nestjs-prisma';
import * as passport from 'passport';
import { RequestHandler } from 'express';

@Global()
@Module({
	imports: [
		PrismaModule,
		RedisModule,
		ThrottlerModule.forRoot([
			{
				ttl: ms('1 minute'),
				limit: 100,
			},
		]),
	],
	providers: [
		SessionMiddleware,
		{
			provide: APP_FILTER,
			useClass: GlobalExceptionFilter,
		},
		{
			provide: APP_FILTER,
			useFactory: prismaExceptionFilter,
			inject: [HttpAdapterHost],
		},
		{
			provide: APP_PIPE,
			useValue: globalValidationPipe,
		},
		// {
		// 	provide: APP_INTERCEPTOR,
		// 	useClass: LoggingInterceptor,
		// },
		{
			provide: APP_GUARD,
			useClass: GlobalThrottlerGuard,
		},
	],
	exports: [RedisModule, PrismaModule],
})
export class CommonModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				securityMiddleware,
				cookieMiddleware,
				SessionMiddleware,
				passport.initialize(),
				passport.session() as RequestHandler,
			)
			.forRoutes('*');
	}
}
