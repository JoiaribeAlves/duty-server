import mongoose from "mongoose";

export default async function connect() {
	try {
		await mongoose.connect(`${process.env.DATABASE_URL}`);

		console.log("Connected to database.");
	} catch (error) {
		console.error("Failed to connect to database.");
	}
}
connect();
