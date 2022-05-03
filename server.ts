import { IrcServer } from './src/Server/IrcServer';

const server = new IrcServer({ port: 9000 });
server.run();
