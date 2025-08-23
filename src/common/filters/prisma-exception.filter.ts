import { HttpAdapterHost } from '@nestjs/core';

import { PrismaClientExceptionFilter } from 'nestjs-prisma';

export function prismaExceptionFilter({ httpAdapter }: HttpAdapterHost) {
	return new PrismaClientExceptionFilter(httpAdapter);
}
