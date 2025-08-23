import * as cookieParser from 'cookie-parser';
import { NextFunction, Request, Response } from 'express';

const cookieParserMiddleware = cookieParser();

export function cookieMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	void cookieParserMiddleware(req, res, next);
}
