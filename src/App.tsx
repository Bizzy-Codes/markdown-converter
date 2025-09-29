// src/App.tsx
import React, { useState, useEffect } from "react";
import MarkdownConverter from "./MarkdownConverter";
import "./index.css"; // ensure styles are imported

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  // apply theme globally on the <body> so CSS var overrides affect everything
  useEffect(() => {
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
    return () => document.body.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1 className="app-title">📄 Markdown Converter</h1>

        <button
          className="theme-toggle"
          onClick={() => setDarkMode((d) => !d)}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </header>

      <main className="main-wrapper">
        <MarkdownConverter />
      </main>
    </div>
  );
};

export default App;
