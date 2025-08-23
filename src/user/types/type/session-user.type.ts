import { User } from '@prisma/client';

export type SessionUser = Pick<
	User,
	'id' | 'username' | 'email' | 'isEmailVerified'
>;
