export * from './logger';
export * from './data-access';
export * from './container';

// Services IDs
import { getService } from './container';
import {ILogger, LoggerID} from './logger';
import { IDummyDataAccess, DummyDataAccessID} from './data-access';

export const ServicesIDs = {
    LoggerID,
    DummyDataAccessID
};

export const Services = {
    logger: getService<ILogger>(LoggerID),
    dummyAccess: getService<IDummyDataAccess>(DummyDataAccessID),
};
