# Electron + React + TypeScript Template

This template helps you quickly start building desktop applications using Electron, React, and TypeScript, with Vite as the frontend build tool. It demonstrates best practices for project structure and development workflow.

## Getting Started

### 1. Install Dependencies

From the project root, run:

```sh
npm install
cd renderer && npm install
```

### 2. Run in Development Mode

From the project root, run:

```sh
npm run dev
```

This will start both the Vite development server (for the React renderer) and Electron. The app will reload automatically as you make changes.

### 3. Build for Production

From the project root, run:

```sh
npm run build
npm start
```

This will build both the renderer and main process, then launch Electron with the production build.

---

## How to Add New Pages and Features (Vite + React)

1. **Add a New Page Component:**
   - In `renderer/src/`, create a new file, e.g., `About.tsx`:
     ```tsx
     export default function About() {
       return <h2>About Page</h2>;
     }
     ```
2. **Add Routing (Optional):**

   - Install React Router:
     ```sh
     cd renderer
     npm install react-router-dom
     ```
   - Update `renderer/src/App.tsx` to use routes:
     ```tsx
     import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
     import About from "./About";
     // ...existing code...
     function App() {
       return (
         <BrowserRouter>
           <nav>
             <Link to="/">Home</Link> | <Link to="/about">About</Link>
           </nav>
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/about" element={<About />} />
           </Routes>
         </BrowserRouter>
       );
     }
     ```
   - Create a `Home` component or use the default content for the home page.

3. **Add Features:**
   - Create new components in `renderer/src/` and import them into your pages as needed.
   - Use React state, hooks, and context as you would in any React app.

---

## How to Add Custom Libraries and Modules

1. **Install a Library:**

   - For frontend (renderer):
     ```sh
     cd renderer
     npm install <library-name>
     ```
   - For Electron main process:
     ```sh
     npm install <library-name>
     ```

2. **Import and Use:**
   - In your React code (renderer), import the library as usual:
     ```tsx
     import _ from "lodash";
     ```
   - In your Electron main process (`main.ts`), import Node.js or npm modules as needed:
     ```ts
     import fs from "fs";
     ```

---

## How to Install Additional Libraries and Components

- **For UI Components (e.g., Material UI, Ant Design):**

  ```sh
  cd renderer
  npm install @mui/material @emotion/react @emotion/styled
  # or
  npm install antd
  ```

  Then import and use them in your React components.

- **For Utility Libraries (e.g., lodash, axios):**

  ```sh
  cd renderer
  npm install lodash axios
  ```

- **For Electron/Node.js Libraries:**

  ```sh
  npm install <library-name>
  ```

  Then import in your Electron main process or preload script.

- **For Custom Node Modules (e.g., database, filesystem, or backend logic):**
  1. Create a new file or folder in the project root (e.g., `db/` or `database.ts`).
  2. Write your Node.js code (e.g., for SQLite, filesystem, etc.) in this module.
  3. Import and use these modules in your Electron main process (`main.ts`) or expose safe APIs to the renderer via the preload script and Electron's IPC (see plan step 4).
  4. Example:
     ```ts
     // database.ts (in project root)
     import Database from "better-sqlite3";
     export function getUser(id: number) {
       /* ... */
     }
     // main.ts
     import { getUser } from "./database";
     ```
  5. Never import these modules directly in the renderer; always use IPC for communication.

---

## IPC (Inter-Process Communication) Demo Explained

This template includes a simple example of safe communication between the Electron main process and the React renderer using Electron's IPC system and a secure preload script.

**How it works:**

1. **Main Process (`main.ts`):**

   - Listens for a `ping` message from the renderer and replies with a string.
   - Sends a message (`main-to-renderer`) to the renderer when the window finishes loading.

2. **Preload Script (`preload.ts`):**

   - Uses Electron's `contextBridge` to safely expose two APIs to the renderer:
     - `ping(msg: string)`: Sends a message to the main process and returns its reply.
     - `onMainMessage(callback)`: Listens for messages from the main process.

3. **Renderer (`App.tsx`):**
   - Calls `window.electronAPI.ping()` to send a message to the main process and displays the reply.
   - Listens for messages from the main process and displays them in the UI.

**Why this is best practice:**

- The renderer never accesses Node.js or Electron APIs directly, which keeps your app secure.
- All communication goes through the preload script, which acts as a safe bridge.
- You can extend this pattern to add more APIs for your app's needs.

---

## Directory & File Structure Explained

```
project-root/
│
├── main.ts           # Electron main process (creates windows, handles app events, sets up IPC)
├── preload.ts        # Preload script (secure bridge for IPC, exposes safe APIs to renderer)
├── package.json      # Project metadata and scripts (root, for Electron and main process)
├── tsconfig.main.json# TypeScript config for main process and preload
├── README.md         # This documentation file
│
└── renderer/         # All React + Vite frontend code
    ├── package.json      # Frontend dependencies and scripts
    ├── vite.config.ts    # Vite config (build tool for React)
    ├── index.html        # HTML entry point for React app
    ├── tsconfig*.json    # TypeScript configs for renderer
    ├── public/           # Static assets (e.g., vite.svg)
    └── src/              # All React source code
        ├── App.tsx           # Main React component (UI, includes IPC demo)
        ├── main.tsx          # React entry point (renders App)
        ├── electron-api.d.ts # TypeScript types for window.electronAPI
        ├── assets/           # Images and static assets
        └── ...               # Other components, styles, etc.
```

### What Each File/Folder Does

- **main.ts**: Starts Electron, creates the app window, sets up IPC handlers. This is the entry point for your desktop app's backend logic.
- **preload.ts**: Runs in a secure context, exposes only safe APIs to the renderer using Electron's contextBridge. All IPC and backend access should go through here.
- **renderer/**: Contains everything for your React frontend. Use this like any modern React project.
- **renderer/src/App.tsx**: Main UI component. Demonstrates how to use IPC to communicate with Electron's main process.
- **renderer/src/electron-api.d.ts**: TypeScript types for the APIs exposed by preload.ts, so you get autocomplete and type safety in the renderer.
- **plan.md**: Documents the project plan, steps, and progress. Useful for learning and tracking what has been done.
- **README.md**: This file! Explains setup, extension, best practices, and structure.

---

## Best Practices & Project Structure

- **Code Organization:**
  - Keep Electron main process code in the project root (`main.ts`).
  - Place the preload script (`preload.ts`) in the root; it is compiled to `dist/preload.js` for secure IPC.
  - All React + Vite code lives in the `renderer/` directory.
  - Use TypeScript for both main and renderer processes for type safety.
- **Security:**
  - The Electron main process is isolated from the renderer.
  - The preload script exposes only safe, intentional APIs to the renderer using `contextBridge`.
  - Never expose Node.js or Electron APIs directly to the renderer.
- **IPC Pattern:**
  - Use `ipcMain.handle` and `ipcRenderer.invoke` for request/response communication.
  - Use `ipcRenderer.on` and `webContents.send` for push messages.
  - All communication between renderer and main should go through the preload script.
- **Extending the Template:**
  - Add new features to the renderer as you would in any React app.
  - Add backend logic (e.g., database, filesystem) as Node modules in the root, and expose them to the renderer via IPC.
- **Documentation:**
  - This README provides instructions for setup, extension, and learning.
  - The `plan.md` documents project goals, decisions, and progress.
- **Comments:**
  - Key files include comments explaining structure and intent. Read through `main.ts`, `preload.ts`, and `renderer/src/App.tsx` for guidance.

---

## Code Comments & Documentation

All key files include comments to help beginners understand:

- **main.ts**: Comments explain window creation, IPC setup, and Electron lifecycle events.
- **preload.ts**: Comments show how to safely expose APIs to the renderer.
- **renderer/src/App.tsx**: Comments explain how to use the exposed APIs and demonstrate IPC.
- **renderer/src/electron-api.d.ts**: Comments describe the types for the exposed APIs.

If you add new files or features, follow this style: add comments explaining what each function, class, or block of code does, especially if it involves Electron, IPC, or integration between backend and frontend.

---

## Tips for Beginners

- Keep React code in `renderer/src/`.
- Use Vite for fast development and hot module replacement.
- Use TypeScript for type safety in both Electron and React code.
- Use the `preload.ts` script to safely expose APIs from Electron to the renderer.
- Check the plan.md for project structure and best practices.

For more details, see the official docs:

- [Electron](https://www.electronjs.org/docs)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
