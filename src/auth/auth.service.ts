import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SessionService } from './session.service';
import { TokenService } from './token.service';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly sessionService: SessionService,
		private readonly tokenService: TokenService,
		private readonly hashService: HashService,
	) {}

	async validateUser(
		username: string,
		password: string,
	): Promise<Omit<User, 'password'> | null> {
		const user = await this.usersService.findOneWhere({ username });

		if (user === null) throw new NotFoundException();
		if (!(await this.hashService.compare(user.password, password))) {
			return null;
		}

		// eslint-disable-next-line
		const { password: _, ...userWithoutPassword } = user;

		return userWithoutPassword;
	}

	async validateUserWithId(id: number): Promise<Omit<User, 'password'> | null> {
		const user = await this.usersService.findOne(id);
		if (user === null) throw new NotFoundException();
		// eslint-disable-next-line
		const { password: _, ...userWithoutPassword } = user;

		return userWithoutPassword;
	}

	async signUp(createUserDto: CreateUserDto): Promise<User> {
		return this.usersService.create(createUserDto);
	}

	async signIn({ userId }: { userId: number }): Promise<{
		accessToken: string;
		refreshToken: string;
		sessionId: number;
	}> {
		const [accessToken, refreshToken] = await Promise.all([
			this.tokenService.createAccessToken({ sub: userId }),
			this.tokenService.createRefreshToken({ sub: userId }),
		]);
		const [accessTokenHash, refreshTokenHash] = await Promise.all([
			this.hashService.hash(accessToken),
			this.hashService.hash(refreshToken),
		]);

		const now = Date.now();
		const safetyThreshold = 30 * 1000;

		const session = await this.sessionService.create({
			userId,
			accessToken: accessTokenHash,
			refreshToken: refreshTokenHash,
			expiresAt: new Date(
				now + this.tokenService.refreshTokenExpiresIn - safetyThreshold,
			),
		});

		return {
			accessToken: accessToken,
			refreshToken: refreshToken,
			sessionId: session.id,
		};
	}

	async signOut(sessionId: number) {
		return this.sessionService.delete(sessionId);
	}

	async refresh(sessionId: number, payload: object) {
		const accessToken = await this.tokenService.createAccessToken(payload);
		const accessTokenHash = await this.hashService.hash(accessToken);
		await this.sessionService.updateAccessToken(sessionId, accessTokenHash);
		return accessToken;
	}
}
