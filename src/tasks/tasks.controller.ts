import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	NotFoundException,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Res,
	UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Prisma, Task } from '@prisma/client';
import { Response } from 'express';
import { CreateTaskDto } from './dto/create-task.dto';
import { ReqUser } from 'src/user/user.decorator';
import { UpdateTaskDto } from './dto/update-task.dto';

// @UseGuards(AccessTokenGuard)
@Controller('/tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Get()
	async findAll(@ReqUser('id') userId: number): Promise<Task[]> {
		return this.tasksService.findAll({ userId: userId });
	}

	@Post()
	async create(
		@ReqUser('id') userId: number,
		@Body() data: CreateTaskDto,
	): Promise<Task> {
		return this.tasksService.create(userId, data);
	}

	@Get(':id')
	async findOne(
		@Param('id', ParseIntPipe) id: number,
		@ReqUser('id') userId: number,
	): Promise<Task | null> {
		const obj = await this.tasksService.findOne({
			id: id,
			userId: userId,
		});
		if (!obj) {
			throw new NotFoundException(`Task with id ${id} not found`);
		}
		return obj;
	}

	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() data: UpdateTaskDto,
	): Promise<Task> {
		return this.tasksService.update(id, data);
	}

	@Delete(':id')
	async delete(
		@Param('id', ParseIntPipe) id: number,
		@Res() res: Response,
	): Promise<void> {
		const deletedObj = await this.tasksService.delete({ id });
		if (deletedObj) {
			res.send({
				statusCode: HttpStatus.OK,
				message: 'Task deleted successfully',
			});
		} else {
			throw new NotFoundException(`Task with id ${id} not found`);
		}
	}
	@Get('/hello')
	getHello(): string {
		return 'Hello, World!';
	}
}
