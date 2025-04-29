import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Todo, Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
	constructor(private readonly prisma: PrismaService) {}
	async findAll(where: Prisma.TodoWhereInput): Promise<Todo[]> {
		return this.prisma.todo.findMany({ where: where });
	}

	async findOne(where: Prisma.TodoWhereUniqueInput): Promise<Todo | null> {
		return this.prisma.todo.findUnique({ where: where });
	}

	async create(userId: number, data: CreateTodoDto): Promise<Todo> {
		return this.prisma.todo.create({ data: { ...data, userId: userId } });
	}

	async update(id: number, data: Prisma.TodoUpdateInput): Promise<Todo> {
		return this.prisma.todo.update({
			where: {
				id,
			},
			data,
		});
	}

	async delete(where: Prisma.TodoWhereUniqueInput): Promise<Todo | null> {
		try {
			return this.prisma.todo.delete({ where: where });
		} catch (error) {
			console.log((error as PrismaClientKnownRequestError).meta?.cause);
			return null;
		}
	}
}
