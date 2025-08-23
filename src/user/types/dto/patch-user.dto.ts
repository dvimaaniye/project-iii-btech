import { Transform, Type } from 'class-transformer';
import { IsAlpha, IsEmail, IsOptional, MinLength } from 'class-validator';

const lowercase = (str: string) => str.toLowerCase();

export class PatchUserDto {
	@Type(() => String)
	@Transform(({ value }) => lowercase(value as string))
	@IsEmail()
	@IsOptional()
	email?: string;

	@Type(() => String)
	@Transform(({ value }) => lowercase(value as string))
	@MinLength(1)
	@IsAlpha()
	@IsOptional()
	firstName?: string;

	@Type(() => String)
	@Transform(({ value }) => lowercase(value as string))
	@MinLength(1)
	@IsAlpha()
	@IsOptional()
	lastName?: string;
}
