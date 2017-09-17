import { ILogger } from '.';
import { injectable } from 'inversify';
import { BrowserWindow } from 'electron';

@injectable()
export class IpcLogger implements ILogger {
    static sendToDevtoolsViaIpc(channel: string, args: any): void {
        const windows = BrowserWindow.getAllWindows();
        if (windows.length > 0) {
            windows[0].webContents.send(channel, args);
        }
    }
    error(message?: any, ...optionalParams: any[]): void {
        IpcLogger.sendToDevtoolsViaIpc('console-error', [message, ...optionalParams]);
    }
    info(message?: any, ...optionalParams: any[]): void {
        IpcLogger.sendToDevtoolsViaIpc('console-info', [message, ...optionalParams]);
    }
    log(message?: any, ...optionalParams: any[]): void {
        IpcLogger.sendToDevtoolsViaIpc('console-log', [message, ...optionalParams]);
    }
    time(label: string): void {
        IpcLogger.sendToDevtoolsViaIpc('console-time', label);
    }
    timeEnd(label: string): void {
        IpcLogger.sendToDevtoolsViaIpc('console-timeEnd', label);
    }
    trace(message?: any, ...optionalParams: any[]): void {
        IpcLogger.sendToDevtoolsViaIpc('console-trace', [message, ...optionalParams]);
    }
    warn(message?: any, ...optionalParams: any[]): void {
        IpcLogger.sendToDevtoolsViaIpc('console-warn', [message, ...optionalParams]);
    }
}
