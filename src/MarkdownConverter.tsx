// src/MarkdownConverter.tsx
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { FaFileCode, FaFileAlt, FaFilePdf } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { jsPDF } from "jspdf";

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const MarkdownConverter: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(
    "# Hello 👋\nStart typing Markdown here..."
  );

  // utility to download a blob
  const downloadBlob = (content: BlobPart, filename: string, type = "text/plain") => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const exportHTML = () => {
    // simple HTML wrapper with escaped markdown inside <pre>
    const html = `<!doctype html>
<html>
<head><meta charset="utf-8"><title>Exported Markdown</title></head>
<body style="font-family:system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;">
<pre>${escapeHtml(markdown)}</pre>
</body>
</html>`;
    downloadBlob(html, "document.html", "text/html");
    toast.success("✅ Exported as HTML");
  };

  const exportTXT = () => {
    downloadBlob(markdown, "document.txt", "text/plain");
    toast.success("✅ Exported as TXT");
  };

  const exportPDF = () => {
    // jsPDF: basic text export (keeps newlines). For heavy formatting you'd convert HTML -> PDF
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(markdown, 180);
    doc.text(lines, 10, 10);
    doc.save("document.pdf");
    toast.success("✅ Exported as PDF");
  };

  return (
    <div className="converter-shell">
      <Toaster
        position="top-right"
        toastOptions={{
          // keep toasts matching the current theme vars
          style: {
            background: "var(--box-bg)",
            color: "var(--text-color)",
            border: "1px solid var(--border-color)",
          },
        }}
      />

      <div className="converter-container">
        <textarea
          className="markdown-input"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Write your Markdown here..."
        />

        <div className="markdown-preview">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>

      <div className="export-section">
        <h3>Export As:</h3>
        <div className="export-buttons">
          <button onClick={exportHTML} title="Export as HTML" aria-label="Export HTML">
            <FaFileCode size={18} />
          </button>
          <button onClick={exportTXT} title="Export as TXT" aria-label="Export TXT">
            <FaFileAlt size={18} />
          </button>
          <button onClick={exportPDF} title="Export as PDF" aria-label="Export PDF">
            <FaFilePdf size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkdownConverter;
