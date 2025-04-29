import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { config } from 'src/config/config.module';
import { AuthService } from '../auth.service';
import { SessionService } from '../session.service';
import { Request } from 'express';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly authService: AuthService,
		private readonly sessionService: SessionService,
		private readonly hashService: HashService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.JWT_ACCESS_TOKEN_SECRET,
			passReqToCallback: true,
		});
	}

	async validate(
		req: Request,
		payload: { sub: number },
	): Promise<{ id: number }> {
		const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
		const sessionId = parseInt(req.cookies['session-id'] as string);

		const [user, session] = await Promise.all([
			await this.authService.validateUserWithId(payload.sub),
			await this.sessionService.findOne({ id: sessionId, userId: payload.sub }),
		]);

		if (
			!user ||
			!session ||
			!(await this.hashService.compare(session.accessToken, accessToken!))
		)
			throw new UnauthorizedException();

		return { id: payload.sub };
	}
}
