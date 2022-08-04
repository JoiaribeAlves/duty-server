import mongoose from "mongoose";

interface IDuty {
	pharmacyId: string;
	startDate: Date;
	endDate: Date;
	createdAt: Date;
}

const DutySchema = new mongoose.Schema<IDuty>({
	pharmacyId: {
		type: String,
		required: true,
	},
	startDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Duty = mongoose.model<IDuty>("Duty", DutySchema);

export default Duty;
