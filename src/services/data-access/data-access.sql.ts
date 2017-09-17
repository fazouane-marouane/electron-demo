import { IDummyDataAccess } from '.';
import { injectable } from 'inversify';
import { createConnection } from 'typeorm';
import { Dummy } from '../../data-models/dummy';
import { inject } from '../container';
import { ILogger, LoggerID  } from '../logger';
import { IIpcMapper, IpcMapperID  } from '../ipc-mapper';
require.resolve('sqlite3');

const connectionPromise = createConnection({
    type: 'sqlite',
    database: 'dummy.db',
    entities: [
        Dummy
    ],
    autoSchemaSync: true
});

@injectable()
export class SqlDummyDataAccess implements IDummyDataAccess {
    @inject(LoggerID)
    private logger: ILogger;
    @inject(IpcMapperID)
    private ipcMapper: IIpcMapper;

    constructor() {
        for (const op of [this.getAll, this.getOne, this.putOne, this.deleteOne]) {
            this.ipcMapper.mapResponder<any>('DummyDataAccess', this, op);
        }
    }

    public async getAll(): Promise<Dummy[]> {
        const connection = await connectionPromise;
        return await connection.manager.find(Dummy);
    }
    async getOne(id: string): Promise<Dummy | null> {
        const connection = await connectionPromise;
        const result = await connection.manager.findOneById(Dummy, id);
        return result || null;
    }
    async deleteOne(id: string): Promise<void> {
        const connection = await connectionPromise;
        await connection.manager.removeById(Dummy, id);
    }
    async putOne(data: Dummy): Promise<void> {
        const connection = await connectionPromise;
        connection.manager.save(Dummy, data);
    }
}
