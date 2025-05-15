// electron-api.d.ts
// TypeScript type definitions for the APIs exposed by preload.ts to the renderer.
// This enables autocomplete and type safety for window.electronAPI in React code.

export interface ElectronAPI {
  // Send a 'ping' message to the main process and get a reply
  ping: (msg: string) => Promise<string>;
  // Listen for messages from the main process
  onMainMessage: (callback: (msg: string) => void) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
