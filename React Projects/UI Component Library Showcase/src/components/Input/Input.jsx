// src/components/Input/Input.jsx
import React from 'react';
import './Input.css';

export const Input = ({ label, placeholder, type = 'text', value, onChange }) => (
  <div className="input-group">
    {label && <label className="input-label">{label}</label>}
    <input
      className="input-field"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default Input;
