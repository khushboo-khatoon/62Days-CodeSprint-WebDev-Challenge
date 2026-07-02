// src/components/Card/Card.jsx
import React from 'react';
import './Card.css';

export const SimpleCard = ({ title, children }) => (
  <div className="card">
    <h3 className="card-title">{title}</h3>
    <div className="card-content">{children}</div>
  </div>
);

export default SimpleCard;
