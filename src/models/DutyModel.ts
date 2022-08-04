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
		unique: true,
	},
	endDate: {
		type: Date,
		required: true,
		unique: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		select: false,
	},
});

const Duty = mongoose.model<IDuty>("Duty", DutySchema);

export default Duty;
