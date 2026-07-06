const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // renderer → main: save a PNG buffer to disk via native dialog
  savePng: (buffer) => ipcRenderer.invoke('save-png', buffer),

  // main → renderer: menu commands
  onMenuSave:        (cb) => ipcRenderer.on('menu-save',         () => cb()),
  onMenuRegen:       (cb) => ipcRenderer.on('menu-regen',        () => cb()),
  onTogglePanel:     (cb) => ipcRenderer.on('menu-toggle-panel', () => cb()),
  onSetMode:         (cb) => ipcRenderer.on('set-mode', (_, mode) => cb(mode)),
});
