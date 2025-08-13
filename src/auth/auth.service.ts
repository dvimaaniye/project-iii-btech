import { Injectable } from '@nestjs/common';
import { PublicUser, UserService } from 'src/user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SessionService } from './session.service';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly sessionService: SessionService,
		private readonly hashService: HashService,
	) {}

	async validateUser(
		username: string,
		password: string,
	): Promise<PublicUser | null> {
		const user = await this.userService.findFirstWithPasswordWhere({
			OR: [{ username: username }, { email: username }],
		});

		if (user === null) {
			return null;
		}

		const passwordMatch = await this.hashService.compare(
			user.password,
			password,
		);

		if (!passwordMatch) {
			return null;
		}

		// eslint-disable-next-line
		const { password: _, ...userWithoutPassword } = user;

		return userWithoutPassword;
	}

	async register(user: CreateUserDto): Promise<PublicUser> {
		return this.userService.create(user);
	}

	async signIn({ userId }: { userId: number }) {}

	async signOut(sessionId: number) {
		return this.sessionService.delete(sessionId);
	}
}
