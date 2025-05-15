import { contextBridge, ipcRenderer } from "electron";

// Example: Expose a safe API to the renderer
contextBridge.exposeInMainWorld("electronAPI", {
  ping: (msg: string) => ipcRenderer.invoke("ping", msg),
  onMainMessage: (callback: (msg: string) => void) => {
    ipcRenderer.on("main-to-renderer", (_event, msg) => callback(msg));
  },
});
