import { Socket } from 'socket.io-client';
import { ApiServiceFactory } from './Api/ApiServiceFactory';
import { ContextElementInterface, StackedContextInterface } from './Context/ContextInterface';
import { printMessage } from './helpers/console';

export class Context implements StackedContextInterface {
	private static _instance: Context;

	private stack: ContextElementInterface[] = [];

	constructor() {
		if (Context._instance) {
			return Context._instance;
		}
		Context._instance = this;
	}

	current(): ContextElementInterface | undefined {
		return this.stack[this.stack.length - 1];
	}

	getStack(): ContextElementInterface[] {
		return this.stack;
	}

	push(context: ContextElementInterface): void {
		this.current()?.willBeStacked();
		this.stack.push(context);
		this.current()?.willBeMounted();
		this.current()?.mount();
		printMessage('Context.push()');
	}

	async pop(): Promise<void> {
		await this.current()?.willBeDestroyed();
		this.stack.pop();
		this.current()?.mount();
	}

	destroy(): void {}
}
