import { Injectable } from '@nestjs/common';
import { PrismaService as _PrismaService } from 'nestjs-prisma';

@Injectable()
export class PrismaService extends _PrismaService {}
