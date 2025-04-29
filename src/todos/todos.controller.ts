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
import { TodosService } from './todos.service';
import { Prisma, Todo } from '@prisma/client';
import { Response } from 'express';
import { AccessTokenGuard } from 'src/auth/strategy/access-token.guard';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ReqUser } from 'src/users/users.decorator';

@UseGuards(AccessTokenGuard)
@Controller('/todos')
export class TodosController {
	constructor(private readonly todosService: TodosService) {}

	@Get()
	async findAll(@ReqUser('id') userId: number): Promise<Todo[]> {
		return this.todosService.findAll({ userId: userId });
	}

	@Post()
	async create(
		@ReqUser('id') userId: number,
		@Body() data: CreateTodoDto,
	): Promise<Todo> {
		return this.todosService.create(userId, data);
	}

	@Get(':id')
	async findOne(
		@Param('id', ParseIntPipe) id: number,
		@ReqUser('id') userId: number,
	): Promise<Todo | null> {
		const obj = await this.todosService.findOne({
			id: id,
			userId: userId,
		});
		if (!obj) {
			throw new NotFoundException(`Todo with id ${id} not found`);
		}
		return obj;
	}

	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() data: Prisma.TodoUpdateInput,
	): Promise<Todo> {
		return this.todosService.update(id, data);
	}

	@Delete(':id')
	async delete(
		@Param('id', ParseIntPipe) id: number,
		@Res() res: Response,
	): Promise<void> {
		const deletedObj = await this.todosService.delete({ id });
		if (deletedObj) {
			res.send({
				statusCode: HttpStatus.OK,
				message: 'Todo deleted successfully',
			});
		} else {
			throw new NotFoundException(`Todo with id ${id} not found`);
		}
	}
	@Get('/hello')
	getHello(): string {
		return 'Hello, World!';
	}
}
