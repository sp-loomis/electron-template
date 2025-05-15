import { contextBridge } from "electron";

// Example: Expose a safe API to the renderer
contextBridge.exposeInMainWorld("electronAPI", {
  // add methods here for IPC
});
