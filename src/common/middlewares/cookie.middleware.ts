import { Request, Response, NextFunction } from 'express';
import * as cookieParser from 'cookie-parser';

const cookieParserMiddleware = cookieParser();

export function cookieMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	void cookieParserMiddleware(req, res, next);
}
