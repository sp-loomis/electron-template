import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // optional, for IPC
      nodeIntegration: false,
      contextIsolation: true,
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

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// IPC handler example
ipcMain.handle("ping", async (_event, arg) => {
  return `Pong from main! You said: ${arg}`;
});
