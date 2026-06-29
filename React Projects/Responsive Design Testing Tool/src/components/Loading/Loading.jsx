// src/components/Loading/Loading.jsx
import './Loading.css';

export default function Loading() {
  return (
    <div className="loading-spinner" role="status" aria-label="Loading">
      <div className="spinner" />
    </div>
  );
}
