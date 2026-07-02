// src/components/Button/Button.jsx
import React from 'react';
import './Button.css';

export const PrimaryButton = ({ children, onClick }) => (
  <button className="btn primary" onClick={onClick}>
    {children}
  </button>
);

export const SecondaryButton = ({ children, onClick }) => (
  <button className="btn secondary" onClick={onClick}>
    {children}
  </button>
);

export const DangerButton = ({ children, onClick }) => (
  <button className="btn danger" onClick={onClick}>
    {children}
  </button>
);

export default PrimaryButton;
