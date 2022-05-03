import { Socket } from 'socket.io-client';
import { ApiServiceFactory } from '../Api/ApiServiceFactory';
import { ChannelService } from '../Api/ChannelService';
import { Context } from '../Context';
import { Command, parseCommand } from '../helpers/command';
import { printMessage, rl } from '../helpers/console';
import { AbstractContextElement, AbstractContextState } from './AbstractContextElement';
import { ChannelContext } from './ChannelContext';

export type HomeContextState = {
	user: string | undefined;
};
export class HomeContext implements AbstractContextElement {
	state: AbstractContextState & HomeContextState = {
		_mounted: false,
		user: undefined,
	};

	socket: Socket;
	inputHandler: (input: string) => void;

	constructor(userLogin: string) {
		this.socket = ApiServiceFactory.getSocket();
		this.inputHandler = (input: string) => {
			// printMessage(`HomeContext: ${input}\n`);
			const line = input.trim();
			if (!line.startsWith('/')) {
				return;
			}

			const command = parseCommand(line);
			this.handleCommand(command);
		};
		this.state.user = userLogin;
	}

	willBeMounted(): void {
		// nothing to do
	}

	mount(): void {
		this.state._mounted = true;
		rl.on('line', this.inputHandler);
	}

	willBeStacked(): void {
		rl.removeListener('line', this.inputHandler);
	}

	willBeDestroyed(): void {
		rl.removeListener('line', this.inputHandler);
	}

	destroy(): void {
		// nothing to do
	}

	async handleInput(line: string): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async handleCommand(cmd: Command): Promise<void> {
		const channelService = ApiServiceFactory.getInstance().get('channel') as ChannelService;

		switch (cmd.name) {
			case 'join_test':

			case 'create_room':
				if (0 === cmd.args.length) {
					printMessage('Please specify a room name\n');
					return;
				}

				// await channelService
				// 	.createChannel(cmd.args[0])
				// 	.then((channel) => {
				// 		new Context().push(
				// 			new ChannelContext(channel)
				// 			);
				// 	})
				// 	.catch(() => {
				// 		printMessage('Error creating room\n');
				// 	});

				return;
			case 'join_room':
				if (0 === cmd.args.length) {
					printMessage('Please specify a room name\n');
					return;
				}

				await channelService
					.joinChannelT(cmd.args[0], this.state.user!)
					.then(() => {
						new Context().push(new ChannelContext(cmd.args[0], this.state.user!));
					})
					.catch(() => {
						printMessage('Error while joining room\n');
					});

				return;
			case 'logout':
				process.exit(0);
				break;
			case 'help':
				printMessage(`Available commands:
					/create_room <room_name>
					/join_room <room_name>
					/logout
					/help
				\n`);
				return;
			default:
				printMessage(`Unknown command: ${cmd.name}\n`);
				return;
		}
	}
}
