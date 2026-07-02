// src/pages/ComponentShowcase.jsx
import React, { useState } from 'react';
import componentsData from '../data/componentsData.js';

const ComponentShowcase = () => {
  const [filter, setFilter] = useState('All');
  const filtered = componentsData.filter(c => filter === 'All' || c.category === filter);

  return (
    <div className="showcase-container" style={{ padding: '1rem' }}>
      <h2>Component Library</h2>
      <div className="filter-bar" style={{ marginBottom: '1rem' }}>
        <label htmlFor="category-select">Filter by Category: </label>
        <select
          id="category-select"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Buttons">Buttons</option>
          <option value="Cards">Cards</option>
          <option value="Modals">Modals</option>
          <option value="Navigation">Navigation</option>
          <option value="Forms">Forms</option>
        </select>
      </div>
      <div className="component-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {filtered.map(comp => (
          <div key={comp.name} className="component-card" style={{ border: '1px solid var(--color-primary)', borderRadius: '8px', padding: '0.5rem' }}>
            <h3>{comp.name}</h3>
            <p>Category: {comp.category}</p>
            <p>Responsive: {comp.responsive ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentShowcase;
