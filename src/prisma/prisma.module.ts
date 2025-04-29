import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaModule as _PrismaModule } from 'nestjs-prisma';

@Module({
	providers: [PrismaService],
	exports: [PrismaService],
})
export default class PrismaModule extends _PrismaModule {}
