import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(@Body() data: CreateUserDto): Promise<User> {
		return this.usersService.create(data);
	}

	@Get()
	async findAll() {
		return this.usersService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.findOne(id);
	}

	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() data: Prisma.UserUpdateInput,
	) {
		return this.usersService.update(id, data);
	}

	@Delete(':id')
	async delete(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.delete(id);
	}
}
