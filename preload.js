// preload.js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // 切换挂起状态
  toggleSuspend: () => ipcRenderer.invoke('toggle-suspend')
})