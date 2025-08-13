import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksQueueModule } from './queue/task-queue.module';

@Module({
	imports: [TasksQueueModule],
	controllers: [TasksController],
	providers: [TasksService],
})
export class TasksModule {}
