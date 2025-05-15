export interface ElectronAPI {
  ping: (msg: string) => Promise<string>;
  onMainMessage: (callback: (msg: string) => void) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
