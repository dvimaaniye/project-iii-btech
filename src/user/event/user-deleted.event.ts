import { Request } from 'express';

export const USER_DELETED_EVENT = 'user.deleted';

export class UserDeletedEvent {
	constructor(public readonly request: Request) {}
}
