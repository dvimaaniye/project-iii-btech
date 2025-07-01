import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task, Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskQueueService } from './queue/task-queue.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
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

	async create(userId: number, data: CreateTaskDto): Promise<Task> {
		const task = await this.prisma.task.create({
			data: { ...data, userId: userId },
		});
		if (data.deadline || data.status !== 'completed') {
			await this.taskQueueService.scheduleNotification({
				id: task.id,
				userId: task.userId,
				deadline: task.deadline,
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
