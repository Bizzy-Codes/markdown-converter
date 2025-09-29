import React, { useState } from "react";
import MarkdownConverter from "./MarkdownConverter";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  return (
    <div>
      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? "☀️" : "🌙"}
      </button>

      {/* Markdown Converter */}
      <MarkdownConverter />
    </div>
  );
};

export default App;
