import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { HttpAdapterHost } from '@nestjs/core';

export function prismaExceptionFilter({ httpAdapter }: HttpAdapterHost) {
	return new PrismaClientExceptionFilter(httpAdapter);
}
