import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
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
		res.cookie('sessionId', sessionId, {
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
		});
		res.cookie('refreshToken', tokens['refreshToken'], {
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
			path: '/auth/refresh',
		});
		res.json({ accessToken: tokens['accessToken'] });
		return res;
	}

	@UseGuards(AccessTokenGuard)
	@Post('/sign-out')
	signOut(@Req() req: Request) {
		return this.authService.signOut(+req.cookies['sessionId']);
	}

	@Post('/refresh')
	async refresh(@Req() req: Request, @Res() res: Response): Promise<Response> {
		if (!req.cookies['sessionId']) {
			return res.sendStatus(HttpStatus.UNAUTHORIZED);
		}

		const sessionId = +req.cookies['sessionId'];
		const session = await this.sessionService.findOne({ id: sessionId });
		if (!session) {
			return res.sendStatus(HttpStatus.UNAUTHORIZED);
		}

		const payload = {
			sub: session.userId,
		};
		const accessToken = await this.authService.refresh(sessionId, payload);

		res.json({ accessToken });
		return res;
	}

	@Get('/sessions')
	findAll() {
		return this.sessionService.findAll();
	}

	@Delete('/sessions')
	deleteAll() {
		return this.sessionService.deleteMany({});
	}
}
