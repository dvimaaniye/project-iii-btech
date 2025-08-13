import { ValidationPipe } from '@nestjs/common';

export const globalValidationPipe = new ValidationPipe({
	whitelist: true,
	transform: true,
	transformOptions: {
		enableImplicitConversion: true,
	},
});
