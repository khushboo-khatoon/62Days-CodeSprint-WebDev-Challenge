// src/components/Modal/Modal.jsx
import React from 'react';
import './Modal.css';

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <header className="modal-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </header>
        <section className="modal-body">{children}</section>
      </div>
    </div>
  );
};

export default Modal;
