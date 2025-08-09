import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { config, ConfigModule } from './config/config.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bullmq';
import { ConnectionOptions } from 'bullmq';

const redisConnection: ConnectionOptions = {
	host: config.REDIS_HOST,
	port: config.REDIS_PORT,
	password: config.REDIS_PASSWORD,
};

@Module({
	imports: [
		ConfigModule,
		BullModule.forRoot({
			connection: redisConnection,
		}),
		ScheduleModule.forRoot(),
		TasksModule,
		UsersModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
