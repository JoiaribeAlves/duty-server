import mongoose from "mongoose";

interface IPharmacy {
	name: string;
	telephone: string;
	whatsapp?: string;
	address: {
		zipCode: string;
		city: string;
		state: string;
		street: string;
		number: number;
		district: string;
		complement?: string;
		linkToMap: string;
	};
}

const PharmacySchema = new mongoose.Schema<IPharmacy>(
	{
		name: {
			type: String,
			required: true,
			uppercase: true,
			trim: true,
		},
		telephone: {
			type: String,
			required: true,
			unique: true,
		},
		whatsapp: {
			type: String,
			default: "",
		},
		address: {
			zipCode: {
				type: String,
				required: true,
				default: "76890-000",
			},
			city: {
				type: String,
				required: true,
				default: "Jaru",
			},
			state: {
				type: String,
				required: true,
				default: "RO",
			},
			street: {
				type: String,
				required: true,
			},
			number: {
				type: Number,
				required: true,
			},
			district: {
				type: String,
				required: true,
			},
			complement: {
				type: String,
			},
			linkToMap: {
				type: String,
				required: true,
			},
		},
	},
	{ timestamps: true }
);

const Pharmacy = mongoose.model<IPharmacy>("Pharmacy", PharmacySchema);

export default Pharmacy;
