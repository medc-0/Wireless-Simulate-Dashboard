import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("desktop", {
	ping: () => ipcRenderer.invoke("ping")
});


