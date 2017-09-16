import { IDummyDataAccess } from '.';
import { injectable } from 'inversify';
import { createConnection } from 'typeorm';
import { Dummy } from '../../data-models/dummy';
import { sendToRendererProcessFromMain } from '../helpers';
import * as IPCResponder from 'electron-ipc-responder';
import {ipcMain} from 'electron';
import { inject } from '../container';
import { ILogger, LoggerID  } from '../logger';
import { ISerializer, SerializerID  } from '../serializer';

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
    private ipcResponder: IPCResponder;
    @inject(LoggerID)
    private logger: ILogger;
    @inject(SerializerID)
    private serializer: ISerializer;

    constructor() {
        const send = (channel: string, data: any) => {
            return sendToRendererProcessFromMain(channel, this.serializer.serialize(data));
        };
        this.ipcResponder = new IPCResponder(send, ipcMain.on.bind(ipcMain));

        this.mapCall(this.getAll);
        this.mapCall(this.getOne);
        this.mapCall(this.deleteOne);
        this.mapCall(this.putOne);
    }

    mapCall(func: Function) {
        this.ipcResponder.registerTopic(`DummyDataAccess#${func.name}`,
            async (payload: { data: object, type: string}[]) => {
                const deserialized = payload.map(p => this.serializer.deserialize(p));
                const result = await func.apply(this, deserialized);
                return this.serializer.serialize(result);
            });
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
        this.logger.info('data.constructor', data, data.constructor ? data.constructor.name : null);
        connection.manager.save(Dummy, data);
    }
}
