import { IrcClient } from './src/Client/IRCCLient';

const client = new IrcClient({ port: 9000 });
client.connect();
