import { yesOrNo } from '../helpers/input';
import { AbstractInputHandler } from './AbstractInputHandler';
import { BackCommand } from './Command/BackCommand';

export class CommandHandler extends AbstractInputHandler {
	commandsClasses = [BackCommand];
	protected async handle(input: string): Promise<void> {
		// console.log(this.commandsClasses);
		this.showHelp();
		// console.log(`CommandHandler: ${input}`);
		await yesOrNo('Do you want to quit ?');
	}

	protected support(input: string): boolean {
		return input.startsWith('/');
	}

	private showHelp(): void {
		process.stdout.write('Available commands:\n');
		// this.commandsClasses.forEach((commandClass) => {
		// 	commandClass.supportedContexts().forEach((context) => {
		// 		process.stdout.write(`/${commandClass.getName()} [${context}]\n`);
		// 		break;
		// 	}));

		// });
	}
}
