import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import { SchedulableTask } from './dto/task-schedule.dto';

@Injectable()
export class TaskQueueService {
	#remindBeforeTimeInMs = 30 * 60 * 1000;
	constructor(@InjectQueue('task-notifications') private queue: Queue) {}

	async scheduleNotification(task: SchedulableTask): Promise<void> {
		if (task.deadline.getTime() <= Date.now()) {
			Logger.warn(`Not scheduling task ${task.id}: deadline already passed`);
			return;
		}
		const delay = Math.max(
			task.deadline.getTime() - Date.now() - this.#remindBeforeTimeInMs,
			0,
		);
		await this.queue.add('notify-user', task, {
			delay,
			jobId: `notify-${task.id}`,
			removeOnComplete: true,
			removeOnFail: true,
		});
		return;
	}

	async cancelNotification(taskId: number) {
		const job = (await this.queue.getJob(
			`notify-${taskId}`,
		)) as Job<SchedulableTask>;
		try {
			if (job) {
				await job.remove();
			}
		} catch (err: unknown) {
			if (err instanceof Error) {
				Logger.warn('Failed to remove job:', err.message);
			} else {
				Logger.warn('Unknown error occurred:', err);
			}
		}
	}

	async rescheduleNotification(task: SchedulableTask) {
		await this.cancelNotification(task.id);
		await this.scheduleNotification(task);
	}
}
