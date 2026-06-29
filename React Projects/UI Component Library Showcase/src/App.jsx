// src/App.jsx
import React, { useState, useEffect } from 'react';
import ComponentShowcase from './pages/ComponentShowcase.jsx';
import './App.css';

const App = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>UI Component Library Showcase</h1>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>
      <ComponentShowcase />
    </div>
  );
};

export default App;
