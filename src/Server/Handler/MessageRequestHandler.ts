import { AbstractRequestHandler, RequestHandlerArguments } from './AbstractRequestHandler';

export class MessageRequestHandler extends AbstractRequestHandler {
	protected handle(args: RequestHandlerArguments): void {
		const { payload, socket } = args;
		switch (payload.type) {
			case 'message:create':
				break;
		}

		this.nextHandler?.handleRequest(args);
	}

	protected support(args: RequestHandlerArguments): boolean {
		return 'message:' === args.payload.type.substring(0, 8);
	}
}
