import { prisma } from '../helpers/database';
import { abort, respond } from '../helpers/request';
import { hashPassword } from '../helpers/security';
import { AbstractRequestHandler, RequestHandlerArguments } from './AbstractRequestHandler';

export class AuthRequestHandler extends AbstractRequestHandler {
	protected async handle(args: RequestHandlerArguments): Promise<void> {
		const { payload, socket } = args;
		switch (payload.type) {
			case 'auth:checkUser':
				if (undefined === payload.data.login) {
					abort(socket, 'Login is missing', payload?.key);
				}

				// check if user exists in the database
				let user = await prisma.user.findUnique({
					where: {
						name: payload.data.login,
					},
				});
				if (null === user) {
					abort(socket, 'User not found', payload?.key);
				}
				const isUserExists = true;
				if (isUserExists) {
					respond(socket, {}, payload.key);
					return;
				}
				abort(socket, 'Invalid login', payload?.key);

				break;

			case 'auth:login':
				if (undefined === payload.data.login || undefined === payload.data.password) {
					abort(socket, 'Login or password is missing');
				}

				if (socket.request.headers.test) {
					console.log('User is logged in [2]');
					return;
				}

				// check if login and password are correct in database
				// (async () => {
				// 	const user = await prisma.user.findOne({
				// 		where: {
				// 			login: payload.data.login,
				// 			password: hashPassword(payload.data.password),
				// 		},
				// 	});

				// 	if (undefined === user) {
				// 		abort(socket, 'Login or password is incorrect');
				// 	}

				// 	socket.handshake.auth = {
				// 		login: payload.data.login,
				// 	};

				// 	// set user online to true in database
				// 	await prisma.user.update({
				// 		where: {
				// 			login: payload.data.login,
				// 		},
				// 		data: {
				// 			online: true,
				// 		},
				// 	});

				// resp;

				break;
			case 'auth:logout':
				if (undefined === socket.handshake.auth.login) {
					abort(socket, 'User is not logged in');
				}
				// this.logout(socket, data);
				break;
		}

		this.nextHandler?.handleRequest(args);
	}

	protected support(args: RequestHandlerArguments): boolean {
		return 'auth:' === args.payload.type.substring(0, 5);
	}
}
