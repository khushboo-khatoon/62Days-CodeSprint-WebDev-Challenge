// src/components/CodeBlock/CodeBlock.jsx
import React from "react";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/themes/prism-tomorrow.css";
import { useClipboard } from "../../hooks/useClipboard.js";

export const CodeBlock = ({ code, language = "jsx" }) => {
  const { copied, copy } = useClipboard();
  const highlighted = Prism.highlight(code, Prism.languages[language] || Prism.languages.javascript, language);

  const handleCopy = async () => {
    await copy(code);
  };

  return (
    <div className="code-block">
      <pre className="language-{language}" style={{ position: "relative" }}>
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        <button
          onClick={handleCopy}
          className="copy-btn"
          style={{ position: "absolute", top: 4, right: 4 }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </pre>
    </div>
  );
};

export default CodeBlock;
