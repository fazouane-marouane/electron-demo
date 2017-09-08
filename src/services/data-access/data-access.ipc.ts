import { IDummyDataAccess } from '.';
import { injectable } from 'inversify';
import { Dummy } from '../../data-models/dummy';
import { ipcRenderer } from 'electron';
import * as IPCResponder from 'electron-ipc-responder';

@injectable()
export class IpcDummyDataAccess implements IDummyDataAccess {
    private ipcResponder: IPCResponder;
    constructor() {
        this.ipcResponder = new IPCResponder(ipcRenderer.send.bind(ipcRenderer), ipcRenderer.on.bind(ipcRenderer));
    }

    sayToHost(name: string, payload?: any): Promise<any> {
        return this.ipcResponder.ask(`DummyDataAccess#${name}`, payload);
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
