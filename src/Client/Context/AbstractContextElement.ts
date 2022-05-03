import { Command } from '../helpers/command';
import { rl } from '../helpers/console';
import { ContextElementInterface } from './ContextInterface';

export type AbstractContextState = {
	_mounted: boolean;
};
export abstract class AbstractContextElement implements ContextElementInterface {
	state: AbstractContextState = {
		_mounted: false,
	};

	inputHandler: ((input: string) => void) | undefined;

	willBeMounted(): void {
		// nothing to do
	}

	mount(): void {
		rl.on('line', this.inputHandler!);
	}

	willBeStacked(): void {
		rl.removeListener('line', this.inputHandler!);
	}

	willBeDestroyed(): void {
		rl.removeListener('line', this.inputHandler!);
	}

	abstract destroy(): void;

	abstract handleInput(line: string): Promise<void>;
	abstract handleCommand(cmd: Command): Promise<void>;
}
