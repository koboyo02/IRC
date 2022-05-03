import { Socket, Server } from 'socket.io';

export abstract class AbstractRequestHandler {
	nextHandler?: AbstractRequestHandler;

	constructor(nextHandler?: AbstractRequestHandler) {
		this.nextHandler = nextHandler;
	}

	handleRequest(args: RequestHandlerArguments): void {
		if (this.support(args)) {
			return this.handle(args);
		}

		if (undefined !== this.nextHandler) {
			return this.nextHandler.handleRequest(args);
		}
	}

	protected abstract handle(args: RequestHandlerArguments): void;
	protected abstract support(args: RequestHandlerArguments): boolean;

	setNextHandler(nextHandler: AbstractRequestHandler): void {
		if (undefined === this.nextHandler) {
			this.nextHandler = nextHandler;
			return;
		}

		this.nextHandler.setNextHandler(nextHandler);
	}
}

export type RequestHandlerArguments = {
	socket: Socket;
	payload: {
		key?: string;
		type: string;
		data: any;
	};
	server: Server;
	options?: any;
};
