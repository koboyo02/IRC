export abstract class AbstractCommand {
	static getName(): string {
		throw new Error('Method not implemented.');
	}

	static getDescription(): string {
		throw new Error('Method not implemented.');
	}

	static usage(): string {
		throw new Error('Method not implemented.');
	}

	static supportedContexts(): string[] {
		throw new Error('Method not implemented.');
	}

	abstract handle(input: string): Promise<void>;
}
