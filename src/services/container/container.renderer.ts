import { Container } from 'inversify';
import { ILogger, LoggerID } from '../logger';
import { DevToolsLogger } from '../logger/logger.devtools';
import { IDummyDataAccess, DummyDataAccessID } from '../data-access';
import { IpcDummyDataAccess } from '../data-access/data-access.ipc';

const container = new Container();
container.bind<ILogger>(LoggerID).to(DevToolsLogger);
container.bind<IDummyDataAccess>(DummyDataAccessID).to(IpcDummyDataAccess);

export default container;
