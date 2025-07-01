import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import PrismaModule from '../prisma/prisma.module';
import { TasksQueueModule } from './queue/task-queue.module';

@Module({
	imports: [PrismaModule, TasksQueueModule],
	controllers: [TasksController],
	providers: [TasksService],
})
export class TasksModule {}
