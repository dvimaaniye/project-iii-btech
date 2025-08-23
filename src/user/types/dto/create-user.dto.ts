import { Transform, Type } from 'class-transformer';
import {
	IsAlpha,
	IsAlphanumeric,
	IsEmail,
	IsNotEmpty,
	IsOptional,
	MinLength,
} from 'class-validator';

import {
	HasLowercase,
	HasNumber,
	HasSymbol,
	HasUppercase,
} from '@/user/validator';

const lowercase = (str: string) => str.toLowerCase();

export class CreateUserDto {
	@Type(() => String)
	@Transform(({ value }) => lowercase(value as string))
	@IsEmail()
	email: string;

	@Type(() => String)
	@Transform(({ value }) => lowercase(value as string))
	@IsAlphanumeric()
	@MinLength(4)
	username: string;

	@Type(() => String)
	@IsNotEmpty()
	@MinLength(8, { message: '$property should be at least 8 characters long.' })
	@HasLowercase()
	@HasUppercase()
	@HasNumber()
	@HasSymbol()
	password: string;

	@Type(() => String)
	@Transform(({ value }) => lowercase(value as string))
	@MinLength(1)
	@IsAlpha()
	firstName: string;

	@Type(() => String)
	@Transform(({ value }) => lowercase(value as string))
	@MinLength(1)
	@IsAlpha()
	@IsOptional()
	lastName?: string;
}
