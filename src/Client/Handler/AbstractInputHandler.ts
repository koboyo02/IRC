import { Socket, Server } from 'socket.io';
import { printMessage } from '../helpers/console';

export abstract class AbstractInputHandler {
	nextHandler?: AbstractInputHandler;

	constructor(nextHandler?: AbstractInputHandler) {
		this.nextHandler = nextHandler;
	}

	handleInput(input: string): void {
		printMessage(`AbstractInputHandler: ${input}\n`);

		if (this.support(input)) {
			return this.handle(input);
		}

		if (undefined !== this.nextHandler) {
			return this.nextHandler.handleInput(input);
		}
	}

	protected abstract handle(input: string): void;
	protected abstract support(input: string): boolean;

	setNextHandler(nextHandler: AbstractInputHandler): void {
		if (undefined === this.nextHandler) {
			this.nextHandler = nextHandler;
			return;
		}

		this.nextHandler.setNextHandler(nextHandler);
	}
}
