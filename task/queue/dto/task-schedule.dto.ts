import { Task } from '@prisma/client';

export interface SchedulableTask {
	id: Task['id'];
	assigneeId: Task['assigneeId'];
	dueDate: Date;
}
