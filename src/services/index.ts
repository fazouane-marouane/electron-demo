export * from './logger';
export * from './data-access';
export * from './container';
export * from './serializer';

// Services IDs
import { getService } from './container';
import {ILogger, LoggerID} from './logger';
import { IDummyDataAccess, DummyDataAccessID} from './data-access';
import { ISerializer, SerializerID} from './serializer';

export const ServicesIDs = {
    LoggerID,
    DummyDataAccessID
};

export const Services = {
    logger: getService<ILogger>(LoggerID),
    serializer: getService<ISerializer>(SerializerID),
    dummyAccess: getService<IDummyDataAccess>(DummyDataAccessID),
};
