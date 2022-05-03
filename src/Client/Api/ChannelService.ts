import { Socket } from 'socket.io-client';
import { request } from '../helpers/request';

export class ChannelService {
	socket: Socket;

	constructor(socket: Socket) {
		this.socket = socket;
	}

	createChannel(name: string, password?: string): Promise<boolean> {
		return request(this.socket, 'channel:create', { name, password }) as Promise<boolean>;
	}

	removeChannel(name: string): Promise<boolean> {
		return request(this.socket, 'channel:remove', { name }) as Promise<boolean>;
	}

	joinChannel(name: string, password?: string): Promise<boolean> {
		return request(this.socket, 'channel:join', { name, password }) as Promise<boolean>;
	}

	leaveChannel(name: string): Promise<boolean> {
		return request(this.socket, 'channel:leave', { name }) as Promise<boolean>;
	}

	getChannels(): Promise<string[]> {
		return request(this.socket, 'channel:getChannels', {}) as Promise<string[]>;
	}

	postMessage(channel: string, message: string): Promise<boolean> {
		return request(this.socket, 'channel:postMessage', { channel, message }) as Promise<boolean>;
	}

	// test

	joinChannelT(name: string, login: string): Promise<boolean> {
		return request(this.socket, 'channel:join_t', { name, login }) as Promise<boolean>;
	}

	leaveChannelT(name: string, login: string): Promise<boolean> {
		return request(this.socket, 'channel:leave_t', { name, login }) as Promise<boolean>;
	}

	postMessageT(channel: string, message: string, login: string): Promise<boolean> {
		return request(this.socket, 'channel:postMessage_t', { channel, message, login }) as Promise<boolean>;
	}
}
