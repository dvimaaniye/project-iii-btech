import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { config } from 'src/config/config.module';
import { AuthService } from '../auth.service';
import { SessionService } from '../session.service';
import { HashService } from 'src/hash/hash.service';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh',
) {
	constructor(
		private readonly authService: AuthService,
		private readonly sessionService: SessionService,
		private readonly hashService: HashService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.JWT_REFRESH_TOKEN_SECRET,
			passReqToCallback: true,
		});
	}

	async validate(
		req: Request,
		payload: { sub: number },
	): Promise<{ id: number; sessionId: number }> {
		const refreshToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
		const sessionId = parseInt(req.cookies['session-id'] as string);

		const [user, session] = await Promise.all([
			await this.authService.validateUserWithId(payload.sub),
			await this.sessionService.findOne({
				userId: payload.sub,
				id: sessionId,
				expiresAt: { gt: new Date() },
			}),
		]);

		if (
			!user ||
			!session ||
			!(await this.hashService.compare(session.refreshToken, refreshToken!))
		)
			throw new UnauthorizedException();

		return { id: payload.sub, sessionId: session.id };
	}
}
