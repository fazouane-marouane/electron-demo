import { ILogger } from '.';
import { injectable } from 'inversify';
import { ipcRenderer } from 'electron';

for (let method of ['error', 'info', 'log', 'trace', 'warn']) {
    ipcRenderer.on(`console-${method}`, function (_: any, args: any[]) {
        console[method].apply(null, ['[MainProcess]', ...args]);
    });
}
ipcRenderer.on(`console-time`, function (_: any, label: string) {
    console.time(`[MainProcess]${label}`);
});
ipcRenderer.on(`console-timeEnd`, function (_: any, label: string) {
    console.timeEnd(`[MainProcess]${label}`);
});

@injectable()
export class DevToolsLogger implements ILogger {
    error(message?: any, ...optionalParams: any[]): void {
        console.error.apply(null, [message, ...optionalParams]);
    }
    info(message?: any, ...optionalParams: any[]): void {
        console.info.apply(null, [message, ...optionalParams]);
    }
    log(message?: any, ...optionalParams: any[]): void {
        console.log.apply(null, [message, ...optionalParams]);
    }
    time(label: string): void {
        console.time(label);
    }
    timeEnd(label: string): void {
        console.timeEnd(label);
    }
    trace(message?: any, ...optionalParams: any[]): void {
        console.trace.apply(null, [message, ...optionalParams]);
    }
    warn(message?: any, ...optionalParams: any[]): void {
        console.warn.apply(null, [message, ...optionalParams]);
    }
}
