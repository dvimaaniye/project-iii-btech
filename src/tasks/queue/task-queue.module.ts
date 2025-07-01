import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TaskQueueService } from './task-queue.service';
import { TaskNotificationProcessor } from './task-notification.processor';

@Module({
	imports: [
		BullModule.registerQueue({
			name: 'task-notifications',
		}),
	],
	providers: [TaskQueueService, TaskNotificationProcessor],
	exports: [TaskQueueService],
})
export class TasksQueueModule {}
