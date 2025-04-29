import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const { httpAdapter } = app.get(HttpAdapterHost);
	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
	app.use(cookieParser());
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
