export const parseCommand = (input: string): Command => {
	const commandParts = input.split(' ');

	return {
		name: commandParts[0].slice(1),
		args: commandParts.slice(1),
	};
};

export type Command = {
	name: string;
	args: string[];
};
