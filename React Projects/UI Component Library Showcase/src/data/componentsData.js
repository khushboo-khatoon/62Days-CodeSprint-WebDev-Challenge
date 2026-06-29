// src/data/componentsData.js
import { categories } from "../constants/categories.js";

export const componentsData = [
  {
    id: 1,
    name: "Primary Button",
    category: "Buttons",
    description: "A primary call‑to‑action button.",
    responsive: true,
    accessibility: "Keyboard accessible, ARIA role=button",
    techniques: ["Flexbox", "CSS Variables"],
    component: "Button",
    jsxCode: `export const PrimaryButton = ({ children, onClick }) => (
  <button className="btn primary" onClick={onClick}>
    {children}
  </button>
);`,
    cssCode: `.btn.primary { background-color: var(--color-primary); color: #fff; }`
  },
  {
    id: 2,
    name: "Simple Card",
    category: "Cards",
    description: "Basic content container with title.",
    responsive: true,
    accessibility: "Semantic heading, focusable if needed",
    techniques: ["Flexbox", "Box Shadow"],
    component: "Card",
    jsxCode: `export const SimpleCard = ({ title, children }) => (
  <div className="card">
    <h3 className="card-title">{title}</h3>
    <div className="card-content">{children}</div>
  </div>
);`,
    cssCode: `.card { border: 1px solid var(--color-primary); border-radius: 8px; padding: 1rem; }`
  },
  {
    id: 3,
    name: "Modal",
    category: "Modals",
    description: "Overlay modal dialogue.",
    responsive: true,
    accessibility: "Focus trap, ESC to close, ARIA role=dialog",
    techniques: ["Positioning", "Transitions"],
    component: "Modal",
    jsxCode: `export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <header className="modal-header"><h3>{title}</h3><button className="close-btn" onClick={onClose}>×</button></header>
        <section className="modal-body">{children}</section>
      </div>
    </div>
  );
};`,
    cssCode: `.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; } .modal-content { background:#fff; padding:1rem; border-radius:8px; min-width:300px; }`
  }
];

export default componentsData;
