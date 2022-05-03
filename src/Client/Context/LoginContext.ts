import { ApiServiceFactory } from '../Api/ApiServiceFactory';
import { AuthService } from '../Api/AuthService';
import { Context } from '../Context';
import { Command, parseCommand } from '../helpers/command';
import { printMessage, rl } from '../helpers/console';
import { AbstractContextElement, AbstractContextState } from './AbstractContextElement';
import { HomeContext } from './HomeContext';

type LoginContextState = {
	user: string | undefined;
	tmp: {
		username: string | undefined;
		password: string | undefined;
	};
};
export class LoginContext implements AbstractContextElement {
	state: AbstractContextState & LoginContextState = {
		_mounted: false,
		user: undefined,
		tmp: {
			username: undefined,
			password: undefined,
		},
	};
	inputHandler: (input: string) => void;

	constructor() {
		this.inputHandler = async (input: string) => {
			const line = input.trim();

			// si la ligne est vide, on ne fait rien
			if (!line) {
				return;
			}

			if (!line.startsWith('/')) {
				this.handleInput(line);
				return;
			}

			const command = parseCommand(line);
			this.handleCommand(command);
		};
	}

	willBeMounted(): void {
		// nothing to do
	}

	mount(): void {
		rl.on('line', this.inputHandler);
		printMessage('Please enter your login\n');
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
		// si on est deja loggué, on ne fait rien
		if (this.state.user) {
			return;
		}

		if (!this.state.tmp.username) {
			this.state.tmp.username = line;
		}

		// si on a pas de username, on le demande
		if (!this.state.tmp.username) {
			this.state.tmp.username = line;
			printMessage('Please enter your login\n');
			return;
		}

		// si on a pas de password, on le demande
		if (!this.state.tmp.password) {
			this.state.tmp.password = line;
			printMessage('Please enter your password\n');
			return;
		}

		// printMessage('Login success\n');
		printMessage('Welcome ' + this.state.tmp.username + '\n');
		// printMessage(this.state.tmp.username);
		// console.log(this.state.tmp.username);

		new Context().push(new HomeContext(this.state.tmp.username));
	}
	async handleCommand(cmd: Command): Promise<void> {
		// cmd.name
	}

	private resetTmpState(): void {
		this.state.tmp.username = undefined;
		this.state.tmp.password = undefined;
	}
}
