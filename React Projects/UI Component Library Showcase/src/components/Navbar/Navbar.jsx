// src/components/Navbar/Navbar.jsx
import React from 'react';
import './Navbar.css';

export const Navbar = ({ title }) => (
  <nav className="navbar">
    <div className="navbar-brand">{title || 'UI Library'}</div>
    <ul className="navbar-links">
      <li><a href="#">Home</a></li>
      <li><a href="#">Components</a></li>
      <li><a href="#">Docs</a></li>
    </ul>
  </nav>
);

export default Navbar;
