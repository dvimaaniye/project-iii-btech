import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';

const helmetMiddleware = helmet();

export function securityMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	helmetMiddleware(req, res, next);
}
