import { Socket } from 'socket.io-client';
import { AuthService } from './AuthService';
import { ChannelService } from './ChannelService';
import { FriendService } from './FriendService';

export class ApiServiceFactory {
	private static _instance: ApiServiceFactory;
	private static socket: Socket;
	private services = {};

	constructor(socket: Socket) {
		if (ApiServiceFactory._instance) {
			return ApiServiceFactory._instance;
		}
		ApiServiceFactory.socket = socket;
		ApiServiceFactory._instance = this;
	}

	static getInstance(): ApiServiceFactory {
		if (!ApiServiceFactory._instance) {
			throw new Error('ApiServiceFactory is not initialized');
		}
		return ApiServiceFactory._instance;
	}

	static getSocket(): Socket {
		return ApiServiceFactory.socket;
	}

	get(serviceName: string): any {
		if (undefined === this.services[serviceName]) {
			switch (serviceName) {
				case 'auth':
					this.services[serviceName] = new AuthService(ApiServiceFactory.socket);
					break;
				case 'channel':
					this.services[serviceName] = new ChannelService(ApiServiceFactory.socket);
					break;
				case 'friend':
					this.services[serviceName] = new FriendService(ApiServiceFactory.socket);
					break;
				default:
					throw new Error('Not implemented');
			}
		}
		return this.services[serviceName];
	}
}
