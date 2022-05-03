import crypto from 'crypto';

export const generateRandomString = (length: number): string => {
	return crypto
		.randomBytes(Math.ceil(length / 2))
		.toString('hex') /** convert to hexadecimal format */
		.slice(0, length); /** return required number of characters */
};
