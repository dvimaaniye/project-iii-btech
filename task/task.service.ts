import { Injectable, Logger } from '@nestjs/common';

import { Prisma, Task } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'nestjs-prisma';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskQueueService } from './queue/task-queue.service';

@Injectable()
export class TaskService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly taskQueueService: TaskQueueService,
	) {}
	async findAll(where: Prisma.TaskWhereInput): Promise<Task[]> {
		return this.prisma.task.findMany({ where: where });
	}

	async findOne(where: Prisma.TaskWhereUniqueInput): Promise<Task | null> {
		return this.prisma.task.findUnique({ where: where });
	}

	async create(
		userId: Task['createdById'],
		data: CreateTaskDto,
	): Promise<Task> {
		const task = await this.prisma.task.create({
			data: { ...data, createdById: userId },
		});
		if (data.deadline || data.status !== 'completed') {
			await this.taskQueueService.scheduleNotification({
				id: task.id,
				assigneeId: task.assigneeId,
				dueDate: task.dueDate,
			});
		}
		return task;
	}

	async update(id: number, data: UpdateTaskDto): Promise<Task> {
		const task = await this.prisma.task.update({
			where: {
				id,
			},
			data,
		});
		if (data.status === 'completed') {
			await this.taskQueueService.cancelNotification(task.id);
		} else if (data.deadline) {
			await this.taskQueueService.rescheduleNotification({
				id: task.id,
				userId: task.userId,
				deadline: task.deadline,
			});
		}
		return task;
	}

	async delete(where: Prisma.TaskWhereUniqueInput): Promise<Task | null> {
		try {
			const task = await this.prisma.task.delete({ where: where });
			if (task.deadline) {
				await this.taskQueueService.cancelNotification(task.id);
			}
			return task;
		} catch (error) {
			console.log((error as PrismaClientKnownRequestError).meta?.cause);
			return null;
		}
	}
}
