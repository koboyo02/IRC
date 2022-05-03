import { respond } from '../helpers/request';
import { AbstractRequestHandler, RequestHandlerArguments } from './AbstractRequestHandler';

export class FriendRequestHandler extends AbstractRequestHandler {
	protected handle(args: RequestHandlerArguments): void {
		const { payload, socket } = args;
		switch (payload.type) {
			case 'friend:add':
				// add

				respond(socket, {}, payload?.key);
				break;

			case 'friend:remove':
				respond(socket, {}, payload?.key);

				break;
		}

		this.nextHandler?.handleRequest(args);
	}

	protected support(args: RequestHandlerArguments): boolean {
		return 'friend:' === args.payload.type.substring(0, 7);
	}
}
