import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { HashService } from 'src/hash/hash.service';
import { PrismaService } from 'nestjs-prisma';

export type PublicUser = Omit<User, 'password'>;

@Injectable()
export class UserService {
	private readonly publicUserConfig = { omit: { password: true } } as const;
	private readonly userIdOnlyConfig = { select: { id: true } } as const;

	constructor(
		private readonly prisma: PrismaService,
		private readonly hashService: HashService,
	) {}

	async create(user: CreateUserDto): Promise<PublicUser> {
		const passwordHash = await this.hashService.hash(user.password);

		user.password = passwordHash;

		const createdUser = await this.prisma.user.create({
			data: user,
			...this.publicUserConfig,
		});

		return createdUser;
	}

	async findAll(): Promise<PublicUser[]> {
		const users = await this.prisma.user.findMany(this.publicUserConfig);
		return users;
	}

	async findOne(id: number): Promise<PublicUser | null> {
		const user = await this.prisma.user.findUnique({
			where: { id },
			...this.publicUserConfig,
		});
		return user;
	}

	async findOneWhere(
		where: Prisma.UserWhereUniqueInput,
	): Promise<PublicUser | null> {
		const user = await this.prisma.user.findUnique({
			where,
			...this.publicUserConfig,
		});
		return user;
	}

	// For authentication - returns user with password for verification
	async findOneWithPassword(id: number): Promise<User | null> {
		const user = await this.prisma.user.findUnique({ where: { id } });
		return user;
	}

	async findFirstWithPasswordWhere(
		where: Prisma.UserWhereInput,
	): Promise<User | null> {
		const user = await this.prisma.user.findFirst({ where });
		return user;
	}

	async findOneWithPasswordWhere(
		where: Prisma.UserWhereUniqueInput,
	): Promise<User | null> {
		const user = await this.prisma.user.findUnique({ where });
		return user;
	}

	async update(
		id: number,
		userPatch: Prisma.UserUpdateInput,
	): Promise<PublicUser> {
		// If password is being updated, hash it first
		if (userPatch.password && typeof userPatch.password === 'string') {
			userPatch.password = await this.hashService.hash(userPatch.password);
		}

		const user = await this.prisma.user.update({
			where: { id },
			data: userPatch,
			...this.publicUserConfig,
		});
		return user;
	}

	async delete(id: number): Promise<PublicUser> {
		const user = await this.prisma.user.delete({
			where: { id },
			...this.publicUserConfig,
		});
		return user;
	}

	async exists(id: number): Promise<boolean> {
		const user = await this.prisma.user.findUnique({
			where: { id },
			...this.userIdOnlyConfig,
		});
		return !!user;
	}

	async count(): Promise<number> {
		return this.prisma.user.count();
	}
}
