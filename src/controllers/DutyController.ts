import { Request, Response } from "express";

import Duty from "../models/DutyModel";
import Pharmacy from "../models/PharmacyModel";

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
		const { startDate } = req.body;

		try {
			const duty = await Duty.findOne({ startDate });

			if (duty) {
				return res.status(422).json({ error: "Unavailable date." });
			}

			await Duty.create(req.body);

			return res.status(201).json({ message: "Duty created successfully." });
		} catch (error) {
			return res.status(500).json({ error: "Internal server error. " });
		}
	}

	async read(req: Request, res: Response) {
		const { date } = req.params;

		try {
			const duties = await Duty.find();

			if (!duties) {
				return res.status(404).json({ error: "No records found." });
			}

			return res.status(200).json(duties);
		} catch (error) {
			return res.status(500).json({ error: "Internal server error. " });
		}
	}

	async search(req: Request, res: Response) {
		const { date } = req.params;

		try {
			const duty = await Duty.findOne({ startDate: date });

			if (!duty) {
				return res
					.status(404)
					.json({ error: "No shift created for the informed date." });
			}

			const pharmacy = await Pharmacy.findOne({ _id: duty.pharmacyId });

			return res.status(200).json({
				duty: {
					startDate: duty.startDate,
					endDate: duty.endDate,
				},
				pharmacy: {
					name: pharmacy?.name,
					telephone: pharmacy?.telephone,
					address: {
						street: pharmacy?.address.street,
						number: pharmacy?.address.number,
						district: pharmacy?.address.district,
						complement: pharmacy?.address.complement,
					},
				},
			});
		} catch (error) {
			return res.status(500).json({ error: "Internal server error. " });
		}
	}

	async update(req: Request, res: Response) {
		const { id } = req.params;

		try {
			const duty = await Duty.findOne({ _id: id });

			if (!duty) {
				return res.status(404).json({ error: "Duty not found." });
			}

			await Duty.updateOne({ _id: id }, req.body);

			return res.status(200).json({ message: "Duty updated successfully." });
		} catch (error) {
			return res.status(500).json({ error: "Internal server error." });
		}
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params;

		try {
			const duty = await Duty.findOne({ _id: id });

			if (!duty) {
				return res.status(404).json({ error: "Duty not found." });
			}

			await Duty.deleteOne({ _id: id });

			return res.status(200).json({ message: "Duty deleted successfully." });
		} catch (error) {
			return res.status(500).json({ error: "Internal server error." });
		}
	}
}

export default new DutyController();
