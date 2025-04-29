import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategy/local-auth.guard';
import { User } from '@prisma/client';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AccessTokenGuard } from './strategy/access-token.guard';
import { ReqUser } from 'src/users/users.decorator';
import { SessionService } from './session.service';
import { RefreshTokenGuard } from './strategy/refresh-token.guard';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly sessionService: SessionService,
	) {}

	@Post('/sign-up')
	async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
		return await this.authService.signUp(createUserDto);
	}

	@UseGuards(LocalAuthGuard)
	@Post('/sign-in')
	async signIn(
		@ReqUser('id') id: number,
		@Res() res: Response,
	): Promise<Response> {
		const { sessionId, ...tokens } = await this.authService.signIn({
			userId: id,
		});
		res.cookie('session-id', sessionId, {
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
		});
		res.json(tokens);
		return res;
	}

	@UseGuards(AccessTokenGuard)
	@Post('/sign-out')
	signOut(@Req() req: Request) {
		return this.authService.signOut(+req.cookies['session-id']);
	}

	@UseGuards(RefreshTokenGuard)
	@Post('/refresh')
	async refresh(
		@ReqUser()
		{ sessionId, ...refreshTokenPayload }: { sessionId: number; id: number },
	) {
		const payload = { sub: refreshTokenPayload.id };

		return this.authService.refresh(sessionId, payload);
	}

	@Get('/sessions')
	findAll() {
		return this.sessionService.findAll();
	}
}
