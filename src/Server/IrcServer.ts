import { Server } from 'socket.io';
import { Client } from './Client';
import { AuthRequestHandler } from './Handler/AuthRequestHandler';
import { ChannelRequestHandler } from './Handler/ChannelRequestHandler';

export class IrcServer {
	host: string;
	port: number;

	server: Server | undefined;

	clients: Client[] = [];

	constructor({ host = 'localhost', port = 9000 }) {
		this.host = host;
		this.port = port;
	}

	getServer() {
		return this.server;
	}

	addListener(eventName: string, callback: (...args: any[]) => void): () => void {
		this.server?.on(eventName, callback);
		return () => this.server?.removeListener(eventName, callback);
	}

	run(): void {
		this.server = new Server(this.port, {});
		const handler = new AuthRequestHandler();
		handler.setNextHandler(new ChannelRequestHandler());

		this.server.on('connection', (socket) => {
			console.log(`Client connected [id=${socket.id}]`);

			socket.on('message', (data) => {
				handler.handleRequest({
					socket,
					payload: JSON.parse(data),
					server: this.server!!,
				});
			});

			setInterval(() => {
				socket.emit('test', 'hey');
			}, 2000);

			socket.on('disconnect', () => {
				console.log(`Client gone [id=${socket.id}]`);
				// set user online to false in database
				this.clients = this.clients.filter((client) => socket.id !== client.socket.id);
			});
		});

		console.log(`IrcServer is running on port ${this.port}`);
	}

	stop(): void {
		this.server?.close();
		this.server = undefined;
		console.log('IrcServer is stopped');
	}
}
