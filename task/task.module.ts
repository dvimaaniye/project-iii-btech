import { Module } from '@nestjs/common';

import { TaskQueueModule } from './queue/task-queue.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
	imports: [TaskQueueModule],
	controllers: [TaskController],
	providers: [TaskService],
})
export class TaskModule {}
