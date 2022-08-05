import "dotenv/config";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { passwordCompare } from "../services";
import User from "../models/UserModel";

class SessionController {
	async index(req: Request, res: Response) {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				return res
					.status(422)
					.json({ error: "Email and Password is required." });
			}

			const user = await User.findOne({ email });

			if (!user || !passwordCompare(password, user.password)) {
				return res.status(404).json({ error: "User or Password invalid." });
			}

			return res.status(200).json({
				token: jwt.sign({ id: user.id }, process.env.APP_SECRET!, {
					expiresIn: "1d",
					subject: user.id,
				}),
			});
		} catch (error) {
			return res.status(500).json({ error: "Internal server error." });
		}
	}
}

export default new SessionController();
