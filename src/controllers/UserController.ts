import { Request, Response } from "express";

import { createPasswordHash } from "../services";
import User from "../models/UserModel";

class UserController {
	async create(req: Request, res: Response) {
		try {
			const { email, password } = req.body;

			const user = await User.findOne({ email });

			if (user) {
				return res.status(422).json({ error: "User already exists." });
			}

			const passwordHash = createPasswordHash(password);

			await User.create({
				email,
				password: passwordHash,
			});

			return res.status(201).json({ message: "User created succesfully." });
		} catch (error) {
			return res.status(500).json({ error: "Internal server error." });
		}
	}

	async read(req: Request, res: Response) {
		try {
			const users = await User.find();

			return res.status(200).json(users);
		} catch (error) {
			return res.status(500).json({ error: "Internal server error." });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const { email, password } = req.body;

			const user = await User.findOne({ email });

			if (user) {
				return res.status(422).json({ error: "User already exists." });
			}

			const passwordHash = createPasswordHash(password);

			await User.create({
				email,
				password: passwordHash,
			});

			return res.status(201).json({ message: "User created succesfully." });
		} catch (error) {
			return res.status(500).json({ error: "Internal server error." });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;

			const user = await User.findOne({ _id: id });

			if (!user) {
				return res.status(404).json({ error: "User not found." });
			}

			await User.deleteOne({ _id: id });

			return res.status(200).json({ message: "User deleted successfully." });
		} catch (error) {
			return res.status(500).json({ error: "Internal server error." });
		}
	}
}

export default new UserController();
