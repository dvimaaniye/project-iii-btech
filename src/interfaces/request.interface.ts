interface RequestWithUser<T> extends Request {
	user: T;
}

export { RequestWithUser };
