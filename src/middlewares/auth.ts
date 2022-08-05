import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IUserRequest extends Request {
	user_id?: string;
}

interface IPayloadData {
	sub: string;
}

export default function authMiddleware(
	req: IUserRequest,
	res: Response,
	next: NextFunction
) {
	try {
		const authHeader = req.headers.authorization;
		const token = authHeader?.split(" ")[1];

		if (!token) {
			return res.status(401).json({ error: "Token was not provided." });
		}

		const { sub } = verify(token, process.env.APP_SECRET!) as IPayloadData;

		req.user_id = sub;

		return next();
	} catch (error) {
		return res.status(401).json({ error: "Authentication failed." });
	}
}
