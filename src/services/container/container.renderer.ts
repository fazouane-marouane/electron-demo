import { Container } from 'inversify';
import { ILogger, LoggerID } from '../logger';
import { DevToolsLogger } from '../logger/logger.devtools';

const container = new Container();
container.bind<ILogger>(LoggerID).to(DevToolsLogger);

export default container;
