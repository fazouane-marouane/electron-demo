import { IDummyDataAccess } from '.';
import { injectable } from 'inversify';
import { createConnection } from 'typeorm';
import { Dummy } from '../../data-models/dummy';
import { sendToRendererProcessFromMain } from '../helpers';
import * as IPCResponder from 'electron-ipc-responder';
import {ipcMain} from 'electron';

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

    constructor() {
        this.ipcResponder = new IPCResponder(sendToRendererProcessFromMain, ipcMain.on.bind(ipcMain));

        this.mapCall(this.getAll);
        this.mapCall(this.getOne);
        this.mapCall(this.deleteOne);
        this.mapCall(this.putOne);
    }

    mapCall(func: Function) {
        this.ipcResponder.registerTopic(`DummyDataAccess#${func.name}`, func.bind(this));
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
