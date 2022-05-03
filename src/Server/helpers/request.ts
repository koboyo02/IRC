import { Socket } from 'socket.io';

export const abort = (socket: Socket, message: string, identifier?: string) => {
	socket.send(JSON.stringify({ key: identifier, success: false, message }));
};

export const respond = (socket: Socket, payload: object = {}, identifier: string | undefined = undefined) => {
	socket.send(JSON.stringify({ key: identifier, success: true, data: payload }));
};
