import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { PublicUser } from 'src/user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
	constructor() {
		super();
	}

	serializeUser(user: PublicUser, done: Function) {
		done(null, user);
	}

	deserializeUser(user: PublicUser, done: Function) {
		done(null, user);
	}
}
