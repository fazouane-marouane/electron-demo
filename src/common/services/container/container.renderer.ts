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
// IPC Mapper
import { IIpcMapper, IpcMapperID } from '../ipc-mapper';
import { IpcMapper } from '../ipc-mapper/ipc-mapper';

const container = new Container();
container.bind<ILogger>(LoggerID).to(DevToolsLogger).inSingletonScope();
container.bind<IDummyDataAccess>(DummyDataAccessID).to(IpcDummyDataAccess).inSingletonScope();
container.bind<ISerializer>(SerializerID).to(Serializer).inSingletonScope();
container.bind<IIpcMapper>(IpcMapperID).to(IpcMapper).inSingletonScope();

export default container;
