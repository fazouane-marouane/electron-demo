import { Container } from 'inversify';
import { ILogger, LoggerID } from '../logger';
import { IpcLogger } from '../logger/logger.ipc';

const container = new Container();
container.bind<ILogger>(LoggerID).to(IpcLogger);

export default container;
