import 'source-map-support';
import { app, BrowserWindow } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
import {install as installDevtron} from 'devtron';
import { getService, ServicesIDs, ILogger } from '../common/services';
import * as isDevMode from 'electron-is-dev';
// tslint:disable-next-line:no-var-requires no-require-imports
import '../common/services'; // init services
import '../common/data-models'; // init data models

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null = null;
const logger = getService<ILogger>(ServicesIDs.LoggerID);

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(isDevMode ?
    'http://localhost:9080' :
    `file://${__dirname}/index.html`);

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    await installExtension(REDUX_DEVTOOLS);
    mainWindow.webContents.openDevTools();
    mainWindow.webContents.on('devtools-opened', () => {
      installDevtron();
    });
    mainWindow.on('moved', () => {
      logger.info('The window\'s moved', mainWindow!.getPosition());
    });
    mainWindow.webContents.once('devtools-focused', () => {
      mainWindow!.webContents.focus();
    });
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }

});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.