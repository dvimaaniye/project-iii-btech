import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

import { TaskNotificationProcessor } from './task-notification.processor';
import { TaskQueueService } from './task-queue.service';

@Module({
	imports: [
		BullModule.registerQueue({
			name: 'task-notifications',
		}),
	],
	providers: [TaskQueueService, TaskNotificationProcessor],
	exports: [TaskQueueService],
})
export class TaskQueueModule {}
