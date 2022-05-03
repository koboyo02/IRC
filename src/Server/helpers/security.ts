import crypto from 'crypto';

// TODO: add salt key
export const hashPassword = (password: string): string => {
	return crypto.createHash('md5').update(password).digest('hex');
};
