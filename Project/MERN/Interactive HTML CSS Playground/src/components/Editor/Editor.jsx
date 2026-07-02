// src/components/Editor/Editor.jsx
import React, { useRef, useEffect } from "react";
import "./Editor.css";

/**
 * Simple textarea editor with line numbers and placeholder.
 * Props: language ("html"|"css"|"js"), value, onChange, placeholder
 */
export default function Editor({ language, value, onChange, placeholder }) {
  const textareaRef = useRef(null);

  // Auto‑adjust height based on content
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  }, [value]);

  return (
    <div className="editor-wrapper" data-language={language}>
      <textarea
        ref={textareaRef}
        className="editor-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck={false}
        aria-label={`${language} editor`}
      />
    </div>
  );
}
