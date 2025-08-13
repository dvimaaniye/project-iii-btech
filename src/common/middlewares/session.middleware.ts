import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import * as session from 'express-session';
import { SessionOptions } from 'express-session';
import { config } from 'src/config/config.module';
import { REDIS_SESSION_STORE } from 'src/common/redis/redis.config';
import { RedisStore } from 'connect-redis';
import * as ms from 'ms';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
	private expressSessionMiddleware: RequestHandler;

	private options: SessionOptions = {
		name: 'sid',
		secret: config.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: config.NODE_ENV === 'production',
			httpOnly: true,
			sameSite: true,
			maxAge: ms(config.SESSION_TTL),
		},
	};

	constructor(@Inject(REDIS_SESSION_STORE) sessionStore: RedisStore) {
		this.options.store = sessionStore;
		this.expressSessionMiddleware = session(this.options);
	}

	use(req: Request, res: Response, next: NextFunction) {
		void this.expressSessionMiddleware(req, res, next);
	}
}
