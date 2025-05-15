// main.ts
// Electron main process: creates the app window, sets up IPC, and manages app lifecycle.
// This is the entry point for your desktop app's backend logic.

import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";

// Creates the main application window and loads the renderer (React app)
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Preload script runs in a secure context and exposes safe APIs to the renderer
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false, // Security: do not expose Node.js in renderer
      contextIsolation: true, // Security: isolate context
    },
  });

  // In development, load Vite dev server; in production, load built files
  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(__dirname, "../renderer/dist/index.html"));
  }

  // Example: Send a message to renderer after window is ready
  win.webContents.on("did-finish-load", () => {
    win.webContents.send("main-to-renderer", "Hello from Electron main process!");
  });
}

// Called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  // On macOS, re-create a window when the dock icon is clicked and there are no other windows open
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// IPC handler example: respond to 'ping' messages from the renderer
ipcMain.handle("ping", async (_event, arg) => {
  return `Pong from main! You said: ${arg}`;
});
