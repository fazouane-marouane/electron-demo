import { Container } from 'inversify';
// Logger
import { ILogger, LoggerID } from '../logger';
import { DevToolsLogger } from '../logger/logger.devtools';
// Data Access
import { IDummyDataAccess, DummyDataAccessID } from '../data-access';
import { IpcDummyDataAccess } from '../data-access/data-access.ipc';
// Serializer
import { ISerializer, SerializerID } from '../serializer';
import { Serializer } from '../serializer/serializer';

const container = new Container();
container.bind<ILogger>(LoggerID).to(DevToolsLogger).inSingletonScope();
container.bind<IDummyDataAccess>(DummyDataAccessID).to(IpcDummyDataAccess);
container.bind<ISerializer>(SerializerID).to(Serializer).inSingletonScope();

export default container;
