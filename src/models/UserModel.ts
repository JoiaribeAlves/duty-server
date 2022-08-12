import mongoose from "mongoose";

interface IUser {
	email: string;
	password: string;
	isAdmin: true | false;
}

const UserSchema = new mongoose.Schema<IUser>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		isAdmin: {
			type: Boolean,
			default: false,
			select: false,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
