import { IDummyDataAccess } from '.';
import { injectable } from 'inversify';
import { createConnection } from 'typeorm';
import { Dummy } from '../../data-models/dummy';
import { inject } from '../container';
import { ILogger, LoggerID  } from '../logger';
import { IIpcMapper, IpcMapperID  } from '../ipc-mapper';
import { EntityManagerPromise } from '../../EntityManagerPromise';
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
    private entityManager = new EntityManagerPromise(connectionPromise);
    @inject(LoggerID)
    private logger: ILogger;
    @inject(IpcMapperID)
    private ipcMapper: IIpcMapper;

    constructor() {
        this.ipcMapper.mapResponders('DummyDataAccess', this,
            this.getAll,
            this.getOne,
            this.putOne,
            this.deleteOne
        );
    }

    public async getAll(): Promise<Dummy[]> {
        return await this.entityManager.find(Dummy);
    }
    async getOne(id: string): Promise<Dummy | null> {
        return await this.entityManager.findOneById(Dummy, id) || null;
    }
    async deleteOne(id: string): Promise<void> {
        await await this.entityManager.removeById(Dummy, id);
    }
    async putOne(data: Dummy): Promise<Dummy> {
        return await this.entityManager.save(data);
    }
}
