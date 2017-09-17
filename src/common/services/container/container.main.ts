import { Container } from 'inversify';
// Logger
import { ILogger, LoggerID } from '../logger';
import { IpcLogger } from '../logger/logger.ipc';
// Data Access
import { IDummyDataAccess, DummyDataAccessID } from '../data-access';
import { SqlDummyDataAccess } from '../data-access/data-access.sql';
// Serializer
import { ISerializer, SerializerID } from '../serializer';
import { Serializer } from '../serializer/serializer';
// IPC Mapper
import { IIpcMapper, IpcMapperID } from '../ipc-mapper';
import { IpcMapper } from '../ipc-mapper/ipc-mapper';

const container = new Container();
container.bind<ILogger>(LoggerID).to(IpcLogger).inSingletonScope();
container.bind<IDummyDataAccess>(DummyDataAccessID).to(SqlDummyDataAccess).inSingletonScope();
container.bind<ISerializer>(SerializerID).to(Serializer).inSingletonScope();
container.bind<IIpcMapper>(IpcMapperID).to(IpcMapper).inSingletonScope();

export default container;
