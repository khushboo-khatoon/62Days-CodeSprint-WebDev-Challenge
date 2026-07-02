// src/pages/History.jsx
import { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import './History.css';

export default function History() {
  const [history, setHistory] = useLocalStorage('analysisHistory', []);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    setReports(history);
  }, [history]);

  const clearHistory = () => {
    if (window.confirm('Clear all analysis history?')) {
      setHistory([]);
    }
  };

  return (
    <section className="history-page">
      <h1>Analysis History</h1>
      {reports.length === 0 ? (
        <p>No previous analyses.</p>
      ) : (
        <ul className="history-list">
          {reports.map((item, idx) => (
            <li key={idx} className="history-item">
              <strong>{item.url}</strong> – {new Date(item.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
      {reports.length > 0 && (
        <button className="clear-btn" onClick={clearHistory}>Clear History</button>
      )}
    </section>
  );
}
