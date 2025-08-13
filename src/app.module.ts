import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { config, ConfigModule } from './config/config.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bullmq';
import { CommonModule } from './common/common.module';
import { REDIS_DATABASE } from './common/redis/redis.config';

@Module({
	imports: [
		ConfigModule,
		CommonModule,
		BullModule.forRoot({
			connection: {
				url: config.REDIS_URL,
				db: REDIS_DATABASE.QUEUE,
			},
		}),
		ScheduleModule.forRoot(),
		TasksModule,
		UserModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
