import { WorkerHost, Processor } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';

interface RawSchedulableTask {
	id: string;
	userId: string;
	deadline: string;
}

@Processor('task-notifications')
export class TaskNotificationProcessor extends WorkerHost {
	async process(job: Job): Promise<void> {
		const { id, userId, deadline } = job.data as RawSchedulableTask;
		Logger.log(
			`Notify user ${userId} about task ${id} and deadline ${deadline}`,
		);
		return Promise.resolve();
	}
}
