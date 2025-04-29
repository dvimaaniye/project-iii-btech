import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { RequestWithUser } from 'src/interfaces/request.interface';

export const ReqUser = createParamDecorator(
	(data: string, ctx: ExecutionContext): any => {
		const request: RequestWithUser<User | JwtPayload> = ctx
			.switchToHttp()
			.getRequest();
		const user = request.user;

		return data ? user[data] : user;
	},
);
