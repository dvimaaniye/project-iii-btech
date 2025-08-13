import { PublicUser } from 'src/user/user.service';
import 'express';

declare module 'express' {
	interface Request {
		user?: PublicUser;
	}
}
