// Preload: expose a safe API
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktop', {
	ping: () => ipcRenderer.invoke('ping')
});


