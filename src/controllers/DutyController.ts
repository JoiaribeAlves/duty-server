import { Request, Response } from "express";

import Duty from "../models/DutyModel";
import Pharmacy from "../models/PharmacyModel";

interface IDutyController {
	create(req: Request, res: Response): Promise<Response>;
	read(req: Request, res: Response): Promise<Response>;
	searchByDate(req: Request, res: Response): Promise<Response>;
	searchById(req: Request, res: Response): Promise<Response>;
	searchByMonth(req: Request, res: Response): Promise<Response>;
	update(req: Request, res: Response): Promise<Response>;
	delete(req: Request, res: Response): Promise<Response>;
}

class DutyController implements IDutyController {
	public async create(req: Request, res: Response) {
		const { startDate } = req.body.data;

		try {
			const duty = await Duty.findOne({ startDate });

			if (duty) {
				return res.status(422).json({ error: "Unavailable date." });
			}

			await Duty.create(req.body.data);

			return res.status(201).json({ message: "Duty created successfully." });
		} catch (error) {
			return res.status(500).json({ error: "Internal server error." });
		}
	}

	public async read(req: Request, res: Response) {
		const { month } = req.query;

		try {
			if (month) {
				const duties = await Duty.find({ month });

				if (!duties) {
					return res
						.status(404)
						.json({ error: `No duty registered for the month of ${month}.` });
				}

				const filteredDuties = duties.map((d) => {
					return {
						id: d._id,
						pharmacyId: d.pharmacyId,
						month: d.month,
						startDate: d.startDate,
						endDate: d.endDate,
					};
				});

				return res.status(200).json(filteredDuties);
			}

			const duties = await Duty.find();

			const filteredDuties = duties.map((d) => {
				return {
					id: d._id,
					pharmacyId: d.pharmacyId,
					month: d.month,
					startDate: d.startDate,
					endDate: d.endDate,
				};
			});

			return res.status(200).json(filteredDuties);
		} catch (error) {
			return res.status(500).json({ error: "Internal server error." });
		}
	}

	public async searchByDate(req: Request, res: Response) {
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
					id: duty._id,
					month: duty.month,
					startDate: duty.startDate,
					endDate: duty.endDate,
				},
				pharmacy: {
					id: pharmacy?._id,
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
					imageUrl: pharmacy?.imageUrl,
				},
			});
		} catch (error) {
			return res.status(500).json({ error: "Internal server error. " });
		}
	}

	public async searchById(req: Request, res: Response) {
		const { id } = req.params;

		try {
			const duty = await Duty.findOne({ _id: id });

			if (!duty) {
				return res.status(404).json({ error: "Duty not found." });
			}

			const pharmacy = await Pharmacy.findById(duty.pharmacyId);

			return res.status(200).json({
				duty: {
					id: duty._id,
					month: duty.month,
					startDate: duty.startDate,
					endDate: duty.endDate,
				},
				pharmacy: {
					id: pharmacy?._id,
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
					imageUrl: pharmacy?.imageUrl,
				},
			});
		} catch (error) {
			return res.status(500).json({ error: "Internal server error. " });
		}
	}

	public async searchByMonth(req: Request, res: Response) {
		const { month } = req.params;

		try {
			const duties = await Duty.find({ month });

			if (!duties) {
				return res
					.status(404)
					.json({ error: `No duty registered for the month of ${month}.` });
			}

			const filteredDuties = duties.map((d) => {
				return {
					id: d._id,
					pharmacyId: d.pharmacyId,
					month: d.month,
					startDate: d.startDate,
					endDate: d.endDate,
				};
			});

			return res.status(200).json(filteredDuties);
		} catch (error) {
			return res.status(500).json({ error: "Internal server error." });
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
