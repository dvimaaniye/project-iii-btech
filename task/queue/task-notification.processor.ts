import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';

import { Job } from 'bullmq';

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
