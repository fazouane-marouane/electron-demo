import { Container } from 'inversify';
import { ILogger, LoggerID } from '../logger';
import { IpcLogger } from '../logger/logger.ipc';
import { IDummyDataAccess, DummyDataAccessID } from '../data-access';
import { SqlDummyDataAccess } from '../data-access/data-access.sql';

const container = new Container();
container.bind<ILogger>(LoggerID).to(IpcLogger);
container.bind<IDummyDataAccess>(DummyDataAccessID).to(SqlDummyDataAccess);

export default container;
