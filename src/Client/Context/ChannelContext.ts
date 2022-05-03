import { Socket } from 'socket.io-client';
import { ApiServiceFactory } from '../Api/ApiServiceFactory';
import { ChannelService } from '../Api/ChannelService';
import { Context } from '../Context';
import { Command, parseCommand } from '../helpers/command';
import { printMessage, rl } from '../helpers/console';
import { AbstractContextState } from './AbstractContextElement';
import { ContextElementInterface } from './ContextInterface';

export type ChannelContextState = {
	channel: string | undefined;
	user: string | undefined;
};
export class ChannelContext implements ContextElementInterface {
	state: AbstractContextState & ChannelContextState = {
		_mounted: false,
		channel: undefined,
		user: undefined,
	};

	inputHandler: (input: string) => void;
	socketMessageHandler: (payload: string) => void;
	socket: Socket;

	constructor(channelName: string, user: string) {
		this.socket = ApiServiceFactory.getSocket();
		this.inputHandler = (input: string) => {
			// printMessage(`ChannelContext: ${input}\n`);
			const line = input.trim();
			if (!line.startsWith('/')) {
				this.handleInputMessage(line);
				return;
			}

			const command = parseCommand(line);
			this.handleCommand(command);
		};

		this.socketMessageHandler = (payload: string) => {
			const data = JSON.parse(payload);
			// printMessage(`==> ${msg.text}\n`);
			// console.log(payload);

			switch (data.event) {
				case 'join':
					printMessage(`${data.user} joined the room\n`);
					break;
				case 'leave':
					printMessage(`${data.user} left the room\n`);
					break;
				case 'message':
					printMessage(`${data.user} said: ${data.text}\n`);
			}
		};

		this.state.channel = channelName;
		this.state.user = user;
	}

	willBeMounted(): void {
		// nothing to do
	}

	mount(): void {
		// console.log('ChannelContext mounted');
		rl.on('line', this.inputHandler);
		this.socket.on(`/channel/${this.state.channel}`, this.socketMessageHandler);
	}

	willBeStacked(): void {
		rl.removeListener('line', this.inputHandler);
	}

	willBeDestroyed(): void {
		rl.removeListener('line', this.inputHandler);
		this.socket.removeListener(`/channel/${this.state.channel}`, this.socketMessageHandler);
	}

	destroy(): void {
		// nothing to do
	}

	async handleInputMessage(msg: string): Promise<void> {
		const channelService = ApiServiceFactory.getInstance().get('channel') as ChannelService;
		await channelService.postMessageT(this.state.channel!, msg, this.state.user!).catch((err) => {
			printMessage('An error occurred while sending your message\n');
		});
	}

	async handleCommand(cmd: Command): Promise<void> {
		const channelService = ApiServiceFactory.getInstance().get('channel') as ChannelService;

		switch (cmd.name) {
			case 'exit_room':
				printMessage('Leaving room...\n');
				await channelService
					.leaveChannelT(this.state.channel!, this.state.user!)
					.then(() => {
						new Context().pop();
					})
					.catch((err) => {
						printMessage('An error occurred while leaving the room\n');
					});
				break;

			case 'help':
				printMessage(`Available commands:
					/exit_room - leave the room
					/help
				\n`);
				break;

			default:
				printMessage(`Unknown command ${cmd.name}\n`);
				break;
		}
	}
}
