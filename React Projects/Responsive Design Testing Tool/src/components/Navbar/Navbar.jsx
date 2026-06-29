import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAnalyze = () => {
    if (url.trim()) {
      navigate(`/analyzer?site=${encodeURIComponent(url.trim())}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">🛠️ Responsive Tester</Link>
      </div>
      <div className="navbar-center">
        <input
          type="url"
          placeholder="Enter site URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="url-input"
        />
        <button className="analyze-btn" onClick={handleAnalyze}>Analyze</button>
      </div>
      <div className="navbar-right">
        <ThemeToggle />
        <button
          className="mobile-menu-toggle"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >☰</button>
      </div>
      {menuOpen && (
        <div className="mobile-nav">
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/analyzer" onClick={() => setMenuOpen(false)}>Analyzer</Link>
          <Link to="/reports" onClick={() => setMenuOpen(false)}>Reports</Link>
          <Link to="/history" onClick={() => setMenuOpen(false)}>History</Link>
          <Link to="/settings" onClick={() => setMenuOpen(false)}>Settings</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        </div>
      )}
    </nav>
  );
}
