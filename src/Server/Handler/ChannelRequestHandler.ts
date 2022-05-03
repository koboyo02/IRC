import { abort, respond } from '../helpers/request';
import { AbstractRequestHandler, RequestHandlerArguments } from './AbstractRequestHandler';

export class ChannelRequestHandler extends AbstractRequestHandler {
	protected handle(args: RequestHandlerArguments): void {
		const { payload, socket, server } = args;
		switch (payload.type) {
			case 'channel:create':
				break;
			case 'channel:edit':
				break;
			case 'channel:remove':
				break;
			case 'channel:join':
				break;

			case 'channel:postMessage':
				break;
			case 'channel:join_t':
				respond(socket, {}, payload?.key);

				server.emit(
					'/channel/' + payload.data.name,
					JSON.stringify({
						event: 'join',
						user: payload.data.login,
					})
				);
				break;

			case 'channel:leave_t':
				respond(socket, {}, payload?.key);

				server.emit(
					'/channel/' + payload.data.name,
					JSON.stringify({
						event: 'leave',
						user: payload.data.login,
					})
				);
				break;

			case 'channel:postMessage_t':
				// console.log(`ChannelRequestHandler: ${payload.data.text}`);
				respond(socket, {}, payload?.key);

				server.emit(
					'/channel/' + payload.data.channel,
					JSON.stringify({
						event: 'message',
						text: payload.data.message,
						user: payload.data.login,
					})
				);
				break;
		}

		this.nextHandler?.handleRequest(args);
	}

	protected support(args: RequestHandlerArguments): boolean {
		return 'channel:' === args.payload.type.substring(0, 8);
	}
}
