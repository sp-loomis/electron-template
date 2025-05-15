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
     import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
     import About from './About';
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
     import _ from 'lodash';
     ```
   - In your Electron main process (`main.ts`), import Node.js or npm modules as needed:
     ```ts
     import fs from 'fs';
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
     import Database from 'better-sqlite3';
     export function getUser(id: number) { /* ... */ }
     // main.ts
     import { getUser } from './database';
     ```
  5. Never import these modules directly in the renderer; always use IPC for communication.

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
