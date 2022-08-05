import bcrypt from "bcryptjs";

export function createPasswordHash(password: string) {
	return bcrypt.hashSync(password);
}

export function passwordCompare(password: string, passwordHash: string) {
	return bcrypt.compareSync(password, passwordHash);
}
