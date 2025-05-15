import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// Main React component for the renderer process.
// Demonstrates UI, state, and safe IPC communication with Electron main process.
function App() {
  const [count, setCount] = useState(0);
  const [mainMsg, setMainMsg] = useState(""); // Message from main process
  const [pong, setPong] = useState(""); // Reply from main process

  useEffect(() => {
    // Listen for messages from main process via the exposed API
    window.electronAPI?.onMainMessage?.((msg: string) => setMainMsg(msg));
  }, []);

  // Send a 'ping' message to the main process and display the reply
  const sendPing = async () => {
    if (window.electronAPI?.ping) {
      const response = await window.electronAPI.ping("Hello from Renderer!");
      setPong(response);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      {/* IPC Demo Section */}
      <h2>IPC Demo</h2>
      <button onClick={sendPing}>Send Ping to Main</button>
      <div>Main says: {mainMsg}</div>
      <div>Pong reply: {pong}</div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
