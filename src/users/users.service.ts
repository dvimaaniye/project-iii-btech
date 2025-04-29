import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { HashService } from 'src/hash/hash.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly hashService: HashService,
	) {}

	async create(data: CreateUserDto): Promise<User> {
		const passwordHash = await this.hashService.hash(data.password);
		return this.prisma.user.create({
			data: { ...data, password: passwordHash },
		});
	}

	async findAll(): Promise<User[]> {
		return this.prisma.user.findMany();
	}

	async findOne(id: number): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { id } });
	}
	async findOneWhere(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
		return this.prisma.user.findUnique({ where });
	}
	async update(id: number, data: Prisma.UserUpdateInput) {
		return this.prisma.user.update({ where: { id }, data });
	}

	async delete(id: number) {
		return this.prisma.user.delete({ where: { id } });
	}
}
