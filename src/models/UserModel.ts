import mongoose from "mongoose";

interface IUser {
	email: string;
	password: string;
	isAdmin: true | false;
	createdAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
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
	createdAt: {
		type: Date,
		default: Date.now,
		select: false,
	},
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
