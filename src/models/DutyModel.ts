import mongoose from "mongoose";

interface IDuty {
	pharmacyId: string;
	month: string;
	startDate: Date;
	endDate: Date;
}

const DutySchema = new mongoose.Schema<IDuty>(
	{
		pharmacyId: {
			type: String,
			required: true,
		},
		month: {
			type: String,
			default: "",
		},
		startDate: {
			type: Date,
			required: true,
			unique: true,
		},
		endDate: {
			type: Date,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
);

const Duty = mongoose.model<IDuty>("Duty", DutySchema);

export default Duty;
