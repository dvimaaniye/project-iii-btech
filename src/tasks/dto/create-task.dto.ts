import { IsDate, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
	@Type(() => String)
	@MinLength(3)
	name: string;

	@Type(() => String)
	@MinLength(4)
	status: string;

	@Type(() => Date)
	@IsDate()
	deadline: Date;
}
