import { Injectable } from '@nestjs/common';
import { Prisma, Session } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionService {
	constructor(private readonly prisma: PrismaService) {}
	create(data: {
		userId: number;
		accessToken: string;
		refreshToken: string;
		expiresAt: Date;
	}) {
		return this.prisma.session.create({ data: data });
	}

	async findAll() {
		return this.prisma.session.findMany();
	}

	async findOne(data: Prisma.SessionWhereUniqueInput): Promise<Session | null> {
		return this.prisma.session.findUnique({
			where: { ...data },
		});
	}

	async updateAccessToken(id: number, accessToken: string) {
		return this.prisma.session.update({ where: { id }, data: { accessToken } });
	}

	async delete(id: number): Promise<Session> {
		return this.prisma.session.delete({ where: { id } });
	}
	async deleteMany(where: Prisma.SessionWhereInput) {
		return this.prisma.session.deleteMany({ where });
	}
}
