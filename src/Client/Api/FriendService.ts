import { Socket } from 'socket.io-client';
import { request } from '../helpers/request';

export class FriendService {
	socket: Socket;

	constructor(socket: Socket) {
		this.socket = socket;
	}

	addFriend(username: string): Promise<boolean> {
		return request(this.socket, 'friend:add', { username }) as Promise<boolean>;
	}

	removeFriend(username: string): Promise<boolean> {
		return request(this.socket, 'friend:remove', { username }) as Promise<boolean>;
	}
}
