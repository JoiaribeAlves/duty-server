import mongoose from "mongoose";

const PharmacySchema = new mongoose.Schema({
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
		trim: true,
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
			default: "Jaru"
		},
		state: {
			type: String,
			required: true,
			default: "RO"
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
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Pharmacy = mongoose.model("Pharmacy", PharmacySchema);

export default Pharmacy;
