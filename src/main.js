const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1440,
    height: 860,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: '#0a0a0a',
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile(path.join(__dirname, 'index.html'));

  // Dev tools - remove for production build
  // win.webContents.openDevTools();
}

function buildMenu() {
  const template = [
    {
      label: 'Space Field',
      submenu: [
        { label: 'About Space Field Generator', role: 'about' },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: () => app.quit() },
      ],
    },
    {
      label: 'Visual',
      submenu: [
        {
          label: 'Save HD Frame',
          accelerator: 'CmdOrCtrl+S',
          click: () => win.webContents.send('menu-save'),
        },
        {
          label: 'Regenerate',
          accelerator: 'CmdOrCtrl+R',
          click: () => win.webContents.send('menu-regen'),
        },
        { type: 'separator' },
        {
          label: 'Toggle Controls Panel',
          accelerator: 'CmdOrCtrl+/',
          click: () => win.webContents.send('menu-toggle-panel'),
        },
        {
          label: 'Fullscreen Canvas',
          accelerator: 'CmdOrCtrl+F',
          click: () => win.setFullScreen(!win.isFullScreen()),
        },
      ],
    },
    {
      label: 'Mode',
      submenu: [
        { label: 'Field',   accelerator: '1', click: () => win.webContents.send('set-mode', 'field')   },
        { label: 'Lines',   accelerator: '2', click: () => win.webContents.send('set-mode', 'lines')   },
        { label: 'Stream',  accelerator: '3', click: () => win.webContents.send('set-mode', 'stream')  },
        { label: 'Flow',    accelerator: '4', click: () => win.webContents.send('set-mode', 'flow')    },
        { label: 'Organic', accelerator: '5', click: () => win.webContents.send('set-mode', 'organic') },
      ],
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// IPC: renderer asks main to save a PNG buffer to disk
ipcMain.handle('save-png', async (event, buffer) => {
  const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const { filePath } = await dialog.showSaveDialog(win, {
    defaultPath: `spacefield_${ts}.png`,
    filters: [{ name: 'PNG Image', extensions: ['png'] }],
  });
  if (filePath) {
    fs.writeFileSync(filePath, Buffer.from(buffer));
    return { saved: true, filePath };
  }
  return { saved: false };
});

app.whenReady().then(() => {
  createWindow();
  buildMenu();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
