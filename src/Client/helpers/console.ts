import readline from 'readline';
// import {Interface: a } from 'readline';

export const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// interface readline.Interface {
// 	ignoreMainHandler: boolean;
// }
// readline.Interface.prototype.ignoreMainHandler = false;

export const printMessage = (message: string) => {
	readline.clearLine(process.stdout, 0);
	readline.cursorTo(process.stdout, 0);
	process.stdout.write(message);
	rl.prompt(true);
};

const input = (prompt: string | undefined): Promise<string> => {
	// rl.prompt(false);
	return new Promise((resolve, _) => {
		const handler = (line: string) => {
			rl.removeListener('line', handler);
			rl.prompt(true);

			resolve(line);
		};
		rl.question(prompt ?? '', handler);
	});
};

export const yesOrNo = async (
	prompt: string,
	defaultChoice: undefined | 'y' | 'n' = undefined
): Promise<boolean> => {
	const hasDefaultChoice = undefined !== defaultChoice;
	const capitalizeY = hasDefaultChoice && 'y' === defaultChoice;

	const answer = await input(`${prompt} ([${capitalizeY ? 'Y' : 'y'}]es/[${!capitalizeY ? 'N' : 'n'}]o)\n`);
	if ('y' === answer.toLowerCase()) {
		return true;
	} else if ('n' === answer.toLowerCase()) {
		return false;
	}
	if (hasDefaultChoice) {
		return capitalizeY;
	}
	clearLastLines(2);
	return yesOrNo(prompt);
};

export const clearScreen = (): void => {
	process.stdout.write('\x1Bc');
};

export const clearLastLines = (count: number): void => {
	process.stdout.moveCursor(0, -count);
	process.stdout.clearScreenDown();
};

export const clearLastLine = (): void => {
	// readline.moveCursor(process.stdout, 0, -1); // up one line
	// readline.clearLine(process.stdout, 1); // from cursor to end
	clearLastLines(1);
};
