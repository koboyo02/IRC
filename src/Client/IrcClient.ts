import { connect, Socket } from 'socket.io-client';
import { ApiServiceFactory } from './Api/ApiServiceFactory';
import { Context } from './Context';
import { ChannelContext } from './Context/ChannelContext';
import { HomeContext } from './Context/HomeContext';
import { LoginContext } from './Context/LoginContext';
import { CommandHandler } from './Handler/CommandHandler';
import { rl } from './helpers/console';
// import { rl } from './helpers/console';
import { input } from './helpers/input';

export class IrcClient {
	private host: string;
	private port: number;
	private socket?: Socket;
	private apiServiceFactory?: ApiServiceFactory;
	private ctx?: Context;
	private isDisconnected: boolean = true;

	constructor({ host, port }: { host?: string; port?: number }) {
		this.host = host || 'localhost';
		this.port = port || 9000;
	}

	async connect() {
		this.socket = connect(`http://${this.host}:${this.port}`);
		this.registerHandlers();
		// rl.prompt(false);

		this.apiServiceFactory = new ApiServiceFactory(this.socket);
		this.ctx = new Context();
		console.log(`Connected to ${this.host}:${this.port}`);
		this.ctx.push(new LoginContext());
		// this.ctx.push(new HomeContext());
	}

	disconnect() {
		this.socket?.disconnect();
		this.apiServiceFactory = undefined;
		this.ctx?.destroy();
		this.ctx = undefined;
	}

	private registerHandlers() {
		this.socket?.on('message', (data) => {
			// console.log(data);
		});
		this.socket?.on('disconnect', () => {});
		this.socket?.on('connect_error', () => {
			console.log('Connection error');
			process.exit(1);
		});
	}
}
