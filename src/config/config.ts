import { Injectable } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import * as ms from 'ms';

@Injectable()
export class Config {
	@IsString()
	public readonly REDIS_PASSWORD!: string;

	@IsString()
	public readonly DATABASE_URL!: string;

	@IsString()
	public readonly JWT_ACCESS_TOKEN_SECRET!: string;

	@IsString()
	public readonly JWT_REFRESH_TOKEN_SECRET!: string;

	@Transform(({ value }) => ms(value as ms.StringValue))
	@IsNumber()
	public readonly JWT_ACCESS_TOKEN_EXPIRES_IN: number;

	@Transform(({ value }) => ms(value as ms.StringValue))
	@IsNumber()
	public readonly JWT_REFRESH_TOKEN_EXPIRES_IN: number;
}
