import { Socket } from 'socket.io-client';
import { request } from '../helpers/request';

export class AuthService {
	socket: Socket;

	constructor(socket: Socket) {
		this.socket = socket;
	}

	checkUser(login: string): Promise<boolean> {
		return request(this.socket, 'auth:checkUser', { login }) as Promise<boolean>;
	}

	login(login: string, password: string): Promise<boolean> {
		return request(this.socket, 'auth:login', { login, password }) as Promise<boolean>;
	}

	logout(): Promise<boolean> {
		return request(this.socket, 'auth:logout', {}) as Promise<boolean>;
	}

	register(login: string, password: string): Promise<boolean> {
		return request(this.socket, 'auth:register', { login, password }) as Promise<boolean>;
	}
}
