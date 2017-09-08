import { BrowserWindow } from 'electron';

export function sendToRendererProcessFromMain(channel: string, args: any): void {
    const windows = BrowserWindow.getAllWindows();
    if (windows.length > 0) {
        windows[0].webContents.send(channel, args);
    }
}
