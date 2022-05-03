export class Console {
	private static _instance: Console;
	userInput: string = '';
	lines: string[] = [];

	constructor() {
		if (Console._instance) {
			return Console._instance;
		}
		Console._instance = this;
		process.stdin.on('keypress', (c, k) => {
			console.log(`---${c} ${k}`);
			// check key
			this.userInput += c;
		});
	}

	addLine(line: string): void {
		this.lines.push(line);
	}

	render(): void {
		const totalLines = this.lines.length;
		// clear screen and move cursor to top, print each line and add a new line for the command input
		process.stdout.write('\x1Bc\x1B[0;0f');
		for (let i = 0; i < totalLines; i++) {
			process.stdout.write(`${this.lines[i]}\n`);
		}
		process.stdout.write('\n');
	}
}
