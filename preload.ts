// preload.ts
// Electron preload script: runs in a secure context and exposes safe APIs to the renderer via contextBridge.
// This is the only way the renderer should access backend functionality or IPC.

import { contextBridge, ipcRenderer } from "electron";

// Expose a safe API to the renderer (window.electronAPI)
contextBridge.exposeInMainWorld("electronAPI", {
  // Send a 'ping' message to the main process and get a reply
  ping: (msg: string) => ipcRenderer.invoke("ping", msg),
  // Listen for messages from the main process (e.g., 'main-to-renderer')
  onMainMessage: (callback: (msg: string) => void) => {
    ipcRenderer.on("main-to-renderer", (_event, msg) => callback(msg));
  },
});
