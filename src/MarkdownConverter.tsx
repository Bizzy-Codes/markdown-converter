import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const MarkdownConverter: React.FC = () => {
  const [markdown, setMarkdown] = useState("# Hello Markdown 🚀");

  return (
    <div className="converter-container">
      {/* Input Area */}
      <textarea
        className="converter-input"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />

      {/* Output Area */}
      <div className="converter-output">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownConverter;
