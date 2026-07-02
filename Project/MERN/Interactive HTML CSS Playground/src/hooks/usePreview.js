// src/hooks/usePreview.js
// Hook to generate iframe preview source from HTML, CSS, JS with debounce.
import { useState, useEffect, useCallback } from "react";

/**
 * usePreview
 * @param {string} html - HTML code
 * @param {string} css - CSS code
 * @param {string} js - JavaScript code
 * @param {number} debounceMs - debounce delay (default 300ms)
 * @returns {{previewSrc: string, errors: string[]}}
 */
export default function usePreview(html, css, js, debounceMs = 300) {
  const [previewSrc, setPreviewSrc] = useState("");
  const [errors, setErrors] = useState([]);

  const generateSrc = useCallback(() => {
    // Build a full HTML document with CSS and JS embedded.
    const src = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>${css}</style>
</head>
<body>
${html}
<script>
// Capture console methods and forward to parent window.
(function() {
  const methods = ["log", "error", "warn", "info"]; // eslint-disable-line no-restricted-syntax
  methods.forEach((method) => {
    const original = console[method];
    console[method] = function(...args) {
      original.apply(console, args);
      try {
        window.parent.postMessage({ type: "console", method, args }, "*");
      } catch (e) {}
    };
  });
})();
${js}
</script>
</body>
</html>`;
    return src;
  }, [html, css, js]);

  useEffect(() => {
    const handler = setTimeout(() => {
      try {
        const src = generateSrc();
        setPreviewSrc(src);
        setErrors([]);
      } catch (e) {
        setErrors([e.message || "Preview generation error"]);
      }
    }, debounceMs);
    return () => clearTimeout(handler);
  }, [html, css, js, debounceMs, generateSrc]);

  return { previewSrc, errors };
}
