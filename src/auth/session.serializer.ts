import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { DoneCallback } from 'passport';

import { PublicUser, SessionUser } from '@/user/types';

@Injectable()
export class SessionSerializer extends PassportSerializer {
	constructor() {
		super();
	}

	serializeUser(user: PublicUser, done: DoneCallback) {
		const { id, username, email, isEmailVerified } = user;
		const sessionUser: SessionUser = { id, username, email, isEmailVerified };
		done(null, sessionUser);
	}

	deserializeUser(user: SessionUser, done: DoneCallback) {
		done(null, user);
	}
}
