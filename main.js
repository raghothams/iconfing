'use strict';

var electron = require("electron");

const {app, BrowserWindow, Tray, Menu, ipcMain, ipcRenderer} = require('electron')
const path = require('path');

const iconPath = path.join(__dirname, 'app', 'img', 'tray-icon-alt.png');
let appIcon = null;
let win = null;
let mainWindow = null;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({show: false});
  appIcon = new Tray(iconPath);

  var contextMenu = Menu.buildFromTemplate([
    { label: 'Quit',
      click: function() {
          app.quit()
      }
    }
  ]);
  appIcon.setToolTip('This is my application.');
  appIcon.setContextMenu(contextMenu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('close-main-window', function () {
    app.quit();
});
