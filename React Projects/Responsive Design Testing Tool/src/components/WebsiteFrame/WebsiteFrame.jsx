// src/components/WebsiteFrame/WebsiteFrame.jsx
import { useState } from "react";
import Loading from "../Loading/Loading";
import './WebsiteFrame.css';

export default function WebsiteFrame({ url }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLoad = () => setLoading(false);
  const handleError = () => {
    setLoading(false);
    setError('Unable to load the site. It may block embedding via X‑Frame‑Options or CSP.');
  };

  const isValidUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  if (!url) {
    return <div className="website-frame placeholder">Enter a URL and click Analyze.</div>;
  }

  if (!isValidUrl(url)) {
    return <div className="website-frame error">Invalid URL format.</div>;
  }

  return (
    <div className="website-frame">
      {loading && <Loading />}
      {error && <div className="error-message">{error}</div>}
      <iframe
        src={url}
        title="Website preview"
        onLoad={handleLoad}
        onError={handleError}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
