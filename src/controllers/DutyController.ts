import { Request, Response } from "express";

import Duty from "../models/DutyModel";

interface IDutyControllerResponse {
	error: string;
}

interface IDutyController {
	create(req: Request, res: Response): Promise<IDutyControllerResponse>;
	read(): void;
	search(): void;
	update(): void;
	delete(): void;
}

class DutyController {
	async create(req: Request, res: Response) {
		const { date } = req.body;

		try {
			const duty = await Duty.findOne({ date });

			if (duty) {
				return res.status(422).json({ error: "Unavailable date." });
			}

			await Duty.create(req.body);

			return res.status(201).json({ message: "Duty created successfully." });
		} catch (error) {
			return res.status(500).json({ error: "Internal server error. " });
		}
	}
}

export default new DutyController();
