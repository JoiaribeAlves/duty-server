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
				return res.status(200).json({});
			}

			const allPharmacies = pharmacies.map((pharmacy) => {
				return {
					id: pharmacy._id,
					name: pharmacy.name,
					telephone: pharmacy.telephone,
					whatsapp: pharmacy.whatsapp,
					address: {
						city: pharmacy?.address.city,
						state: pharmacy?.address.state,
						street: pharmacy.address.street,
						number: pharmacy.address.number,
						district: pharmacy.address.district,
						complement: pharmacy.address.complement,
						linkToMap: pharmacy.address.linkToMap,
					},
					imageUrl: pharmacy.imageUrl,
				};
			});

			return res.status(200).json(allPharmacies);
		} catch (error) {
			return res.status(500).json({ error: "Internal server error." });
		}
	}

	async search(req: Request, res: Response) {
		const { id } = req.params;

		try {
			const pharmacy = await Pharmacy.findById(id);

			if (!pharmacy) {
				return res.status(404).json({ error: "Pharmacy not found." });
			}

			return res.status(200).json({
				name: pharmacy.name,
				telephone: pharmacy.telephone,
				whatsapp: pharmacy.whatsapp,
				address: {
					city: pharmacy.address.city,
					state: pharmacy.address.state,
					street: pharmacy.address.street,
					number: pharmacy.address.number,
					district: pharmacy.address.district,
					complement: pharmacy.address.complement,
					linkToMap: pharmacy.address.linkToMap,
				},
				imageUrl: pharmacy.imageUrl,
			});
		} catch (error) {
			return res.status(500).json({ error: "Internal server error." });
		}
	}

	async update(req: Request, res: Response) {
		const { id } = req.params;

		try {
			const pharmacy = await Pharmacy.findById(id);

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
			const pharmacy = Pharmacy.findById(id);

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
