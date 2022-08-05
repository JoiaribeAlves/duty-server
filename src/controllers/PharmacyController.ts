import { Request, Response } from "express";

import Pharmacy from "../models/PharmacyModel";

class PharmacyController {
	async create(req: Request, res: Response) {
		const { telephone } = req.body;

		try {
			const pharmacy = await Pharmacy.findOne({ telephone });

			if (pharmacy) {
				return res.status(422).json({ error: "This pharmacy already exists." });
			}

			await Pharmacy.create(req.body);

			return res
				.status(201)
				.json({ message: "Pharmacy created successfully." });
		} catch (error) {
			return res.status(500).json({ error: "Internal server error." });
		}
	}

	async read(req: Request, res: Response) {
		try {
			const pharmacies = await Pharmacy.find();

			if (pharmacies.length === 0) {
				return res.status(404).json({});
			}

			return res.status(200).json({ pharmacies });
		} catch (error) {
			return res.status(500).json({ error: "Internal server error." });
		}
	}

	async search(req: Request, res: Response) {
		const { id } = req.params;

		try {
			const pharmacy = await Pharmacy.findOne({ _id: id });

			if (!pharmacy) {
				return res.status(404).json({ error: "Pharmacy not found." });
			}

			return res.status(200).json(pharmacy);
		} catch (error) {
			return res.status(500).json({ error: "Internal server error." });
		}
	}

	async update(req: Request, res: Response) {
		const { id } = req.params;

		try {
			const pharmacy = await Pharmacy.findOne({ _id: id });

			if (!pharmacy) {
				return res.status(404).json({ error: "Pharmacy not found." });
			}

			await Pharmacy.updateOne({ _id: id }, req.body);

			return res
				.status(200)
				.json({ message: "Pharmacy updated successfully." });
		} catch (error) {
			return res.status(500).json({ error: "Internal server error." });
		}
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params;

		try {
			const pharmacy = Pharmacy.findOne({ _id: id });

			if (!pharmacy) {
				return res.status(404).json({ error: "Pharmacy not found. " });
			}

			await Pharmacy.deleteOne({ _id: id });

			return res
				.status(200)
				.json({ message: "Pharmacy deleted successfully." });
		} catch (error) {
			return res.status(500).json({ error: "Internal server error." });
		}
	}
}

export default new PharmacyController();
