import { ipcRenderer, ipcMain } from 'electron';
import { injectable } from 'inversify';
import * as IPCResponder from 'electron-ipc-responder';
import * as isRenderer from 'is-electron-renderer';
import { inject } from '../container';
import { sendToRendererProcessFromMain } from '../helpers';
import { ISerializer, SerializerID } from '../serializer';
import { IIpcMapper, FunctionReturningAPromise } from '.';

@injectable()
export class IpcMapper implements IIpcMapper {
    private ipcResponder: IPCResponder;
    @inject(SerializerID)
    private serializer: ISerializer;

    constructor() {
        const send = isRenderer ?
            ipcRenderer.send.bind(ipcRenderer) :
            sendToRendererProcessFromMain;
        const on = isRenderer ?
            ipcRenderer.on.bind(ipcRenderer) :
            ipcMain.on.bind(ipcMain);
        this.ipcResponder = new IPCResponder(send, on);
    }

    mapCallers(subject: string, service: object, ...funcs: FunctionReturningAPromise[]): void {
        for (const func of funcs) {
            service[func.name] = async (...args: any[]) => {
                const serialized = args.map(p => this.serializer.serialize(p));
                const response = await this.ipcResponder.ask(`${subject}#${func.name}`, serialized);
                return this.serializer.deserialize(response);
            };
        }
    }

    mapResponders(subject: string, service: object, ...funcs: FunctionReturningAPromise[]): void {
        for (const func of funcs) {
            this.ipcResponder.registerTopic(`${subject}#${func.name}`,
                async (payload: { data: object, type: string }[]) => {
                    const deserialized = payload.map(p => this.serializer.deserialize(p));
                    const result = await func.apply(service, deserialized);
                    return this.serializer.serialize(result);
                });
        }
    }
}
