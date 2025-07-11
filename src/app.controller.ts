import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AccessTokenGuard } from './auth/strategy/access-token.guard';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@UseGuards(AccessTokenGuard)
	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Get('/check')
	healthCheck(): string {
		return 'health check';
	}
}
