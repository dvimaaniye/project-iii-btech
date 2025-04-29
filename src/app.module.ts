import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	imports: [
		ConfigModule,
		ScheduleModule.forRoot(),
		TodosModule,
		UsersModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
