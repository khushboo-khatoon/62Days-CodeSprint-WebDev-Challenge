// src/components/ThemeToggle/ThemeToggle.jsx
import React, { useEffect } from 'react';
import { applyTheme, lightTheme, darkTheme } from '../../constants/theme';
import useLocalStorage from '../../hooks/useLocalStorage';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  // Apply theme on mount and when changed
  useEffect(() => {
    const themeObj = theme === 'dark' ? darkTheme : lightTheme;
    applyTheme(themeObj);
  }, [theme]);

  const toggle = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
