import { Socket } from 'socket.io';

export class Client {
	login: string;
	socket: Socket;

	constructor(login: string, socket: Socket) {
		this.login = login;
		this.socket = socket;
	}

	on(eventName: string, callback: (...args: any[]) => void) {
		this.socket.on(eventName, callback);
	}
}
