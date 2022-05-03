import { HomeContext } from '../../Context/HomeContext';
import { AbstractCommand } from './AbstractCommand';

export class BackCommand extends AbstractCommand {
	static getName(): string {
		return 'back';
	}

	static getDescription(): string {
		return 'Go back to the previous context';
	}

	static usage(): string {
		return `/${BackCommand.getName()}`;
	}

	static supportedContexts(): string[] {
		return ['HomeContext'];
	}

	handle(input: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
