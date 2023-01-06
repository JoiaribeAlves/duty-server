import { Request, Response } from "express";

import Duty from "../models/DutyModel";
import Pharmacy from "../models/PharmacyModel";

interface IDutyController {
	create(req: Request, res: Response): Promise<Response>;
	read(req: Request, res: Response): Promise<Response>;
	search(req: Request, res: Response): Promise<Response>;
	update(req: Request, res: Response): Promise<Response>;
	delete(req: Request, res: Response): Promise<Response>;
}

class DutyController implements IDutyController {
	public async create(req: Request, res: Response) {
		const { startDate } = req.body;

		try {
			const duty = await Duty.findOne({ startDate });

			if (duty) {
				return res.status(422).json({ error: "Unavailable date." });
			}

			await Duty.create(req.body);

			return res.status(201).json({ message: "Duty created successfully." });
		} catch (error) {
			return res.status(500).json({ error: "Internal server error." });
		}
	}

	public async read(req: Request, res: Response) {
		const { month } = req.query;

		try {
			if (month) {
				const filteredDuties = await Duty.find({ month });

				const allFilteredDuties = filteredDuties.map((d) => {
					return {
						id: d._id,
						pharmacyId: d.pharmacyId,
						month: d.month,
						startDate: d.startDate,
						endDate: d.endDate,
					};
				});

				return res.status(200).json(allFilteredDuties);
			}

			const duties = await Duty.find();

			const allDuties = duties.map((d) => {
				return {
					id: d._id,
					pharmacyId: d.pharmacyId,
					startDate: d.startDate,
					endDate: d.endDate,
				};
			});

			return res.status(200).json(allDuties);
		} catch (error) {
			return res.status(500).json({ error: "Internal server error." + error });
		}
	}

	public async search(req: Request, res: Response) {
		const { date } = req.params;

		try {
			const duty = await Duty.findOne({ startDate: date });

			if (!duty) {
				return res
					.status(404)
					.json({ error: "No shift created for the informed date." });
			}

			const pharmacy = await Pharmacy.findById(duty.pharmacyId);

			return res.status(200).json({
				duty: {
					startDate: duty.startDate,
					endDate: duty.endDate,
				},
				pharmacy: {
					name: pharmacy?.name,
					telephone: pharmacy?.telephone,
					whatsapp: pharmacy?.whatsapp,
					address: {
						city: pharmacy?.address.city,
						state: pharmacy?.address.state,
						street: pharmacy?.address.street,
						number: pharmacy?.address.number,
						district: pharmacy?.address.district,
						complement: pharmacy?.address.complement,
						linkToMap: pharmacy?.address.linkToMap,
					},
				},
			});
		} catch (error) {
			return res.status(500).json({ error: "Internal server error. " });
		}
	}

	public async update(req: Request, res: Response) {
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

	public async delete(req: Request, res: Response) {
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
