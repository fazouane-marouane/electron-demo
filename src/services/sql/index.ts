import db from 'sqlite';
import {ipcMain} from'electron';

export function toto() {
    ipcMain.emit('log', null, ['yo', {a: 42}, 666]);
}