import readline from 'readline';
import { ApiServiceFactory } from '../Api/ApiServiceFactory';
import { AuthService } from '../Api/AuthService';

export const input = (prompt: string | undefined): Promise<string> => {
	return new Promise((resolve, _) => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		const handler = (line: string) => {
			rl.removeListener('line', handler);
			rl.close();
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

// export const register = async (loginInput?: string) => {
// 	const authService = ApiServiceFactory.get('auth') as AuthService;
// 	if (undefined === login) {
// 		loginInput = await input('Login: ');
// 	}
// 	const passwordInput = await input('Password: ');
// 	const passwordConfirmation = await input('Confirm password: ');
// 	if (passwordInput !== passwordConfirmation) {
// 		clearLastLine();
// 		return register(loginInput);
// 	}
// 	return authService.register(loginInput!!, passwordInput);
// };

// export const login = async () => {
// 	const loginInput = await input('Login: ');
// 	// check existence of login in the database
// 	const authService = ApiServiceFactory.get('auth') as AuthService;
// 	const isUserExists = true === (await authService.checkUser(loginInput));
// 	if (!isUserExists) {
// 		const willRegister = await yesOrNo('User does not exist. Do you want to register it?');
// 		if (willRegister) {
// 			// register(login);
// 		}
// 		// exit process
// 		process.exit(0);
// 	}
// 	const passwordInput = await input('Password: ');
// 	authService.login(loginInput, passwordInput).catch((e) => {
// 		// print error message
// 		process.stdout.write(`${e}\n`);

// 		clearLastLine();
// 		login();
// 	});
// };
