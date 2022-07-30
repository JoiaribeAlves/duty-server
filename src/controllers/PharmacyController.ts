import { Request, Response } from "express";

import Pharmacy from "../models/PharmacyModel";

class PharmacyController {
	async create(req: Request, res: Response) {
		const { telephone } = req.body;

		try {
			const phone = await Pharmacy.findOne({
				telephone,
			});

			if (phone) {
				return res.status(422).json({ error: "This pharmacy already exists." });
			}

			await Pharmacy.create(req.body);

			return res.status(201).json({ message: "Pharmacy registered successfully." });
		} catch (error) {
			return res.status(500).json({ error: "Internal server error." });
		}
	}
}

export default new PharmacyController();
