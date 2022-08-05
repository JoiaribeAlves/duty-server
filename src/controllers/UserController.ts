import { Request, Response } from "express";

import { createPasswordHash, passwordCompare } from "../services";
import User from "../models/UserModel";

class UserController {
	async create(req: Request, res: Response) {
		try {
			const { email, password } = req.body;

			const user = await User.findOne({ email });

			if (user) {
				return res.status(422).json({ error: "User already exists." });
			}

			const passwordHash = await createPasswordHash(password);

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
			const { email, password, newPassword } = req.body;

			const user = await User.findOne({ email }).select("+password");

			if (!user || !(await passwordCompare(password, user.password))) {
				return res.status(401).json({ error: "User os Password invalid." });
			}

			const passwordHash = await createPasswordHash(newPassword);

			await User.updateOne(
				{ email },
				{
					email,
					password: passwordHash,
				}
			);

			return res.status(201).json({ message: "User updated succesfully." });
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
