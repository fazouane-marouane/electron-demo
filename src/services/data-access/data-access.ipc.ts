import { IDummyDataAccess } from '.';
import { injectable } from 'inversify';
import { Dummy } from '../../data-models/dummy';
import { ipcRenderer } from 'electron';
import * as IPCResponder from 'electron-ipc-responder';
import { inject } from '../container';
import { ISerializer, SerializerID  } from '../serializer';

@injectable()
export class IpcDummyDataAccess implements IDummyDataAccess {
    private ipcResponder: IPCResponder;
    @inject(SerializerID)
    private serializer: ISerializer;
    constructor() {
        this.ipcResponder = new IPCResponder(ipcRenderer.send.bind(ipcRenderer), ipcRenderer.on.bind(ipcRenderer));
    }

    async sayToHost(name: string, ...payload: any[]): Promise<any> {
        const serialized = payload.map(p => this.serializer.serialize(p));
        const response = await this.ipcResponder.ask(`DummyDataAccess#${name}`, serialized);
        return this.serializer.deserialize(response);
    }

    getAll(): Promise<Dummy[]> {
        return this.sayToHost(this.getAll.name);
    }
    getOne(id: string): Promise<Dummy | null> {
        return this.sayToHost(this.getOne.name, id);
    }
    deleteOne(id: string): Promise<void> {
        return this.sayToHost(this.deleteOne.name, id);
    }
    putOne(data: Dummy): Promise<void> {
        return this.sayToHost(this.putOne.name, data);
    }
}
