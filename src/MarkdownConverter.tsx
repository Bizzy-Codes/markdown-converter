import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./markdown.css";

const MarkdownConverter = () => {
  const [text, setText] = useState<string>("## Hello Markdown 🚀");

  return (
    <div className="markdown-container">
      <textarea
        className="markdown-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your markdown here..."
      />
      <div className="markdown-preview">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownConverter;
