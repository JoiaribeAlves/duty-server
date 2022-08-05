import bcrypt from "bcryptjs";

export async function createPasswordHash(password: string) {
	return bcrypt.hashSync(password);
}

export async function passwordCompare(password: string, passwordHash: string) {
	return bcrypt.compareSync(password, passwordHash);
}
