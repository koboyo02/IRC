import { Socket } from 'socket.io-client';
import { generateRandomString } from './security';

export const request = (
	socket: Socket,
	type: string,
	payload: object,
	options: RequestOptions = { timeout: 4 * 1000 }
): Promise<boolean | string | object> => {
	return new Promise((resolve, reject) => {
		const key = generateRandomString(16);

		const timeout = setTimeout(() => {
			socket.removeListener('message', handler);
			clearTimeout(timeout);
			reject('timeout');
		}, options.timeout);

		const handler = (result) => {
			// console.log('result', result);
			result = JSON.parse(result);
			if (undefined === result.key || key !== result.key) {
				return;
			}
			socket.removeListener('message', handler);
			clearTimeout(timeout);
			if (result.success) {
				resolve(true);
			} else {
				reject(result.message);
			}
		};
		socket.on('message', handler).send(JSON.stringify({ key, type, data: payload }));
	});
};

export type RequestPayload = {
	type: string;
	data: object;
};

export type RequestOptions = {
	timeout?: number;
};
