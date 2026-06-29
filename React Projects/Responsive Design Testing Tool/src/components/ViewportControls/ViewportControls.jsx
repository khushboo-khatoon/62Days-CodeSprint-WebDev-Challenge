// src/components/ViewportControls/ViewportControls.jsx
import { useState, useEffect } from 'react';
import { useViewport } from '../../hooks/useViewport';
import './ViewportControls.css';

export default function ViewportControls() {
  const { customSize, setCustomSize } = useViewport();
  const [width, setWidth] = useState(customSize.width);
  const [height, setHeight] = useState(customSize.height);

  // Debounce updates to avoid rapid state changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setCustomSize({ width: Number(width), height: Number(height) });
    }, 300);
    return () => clearTimeout(handler);
  }, [width, height, setCustomSize]);

  return (
    <div className="viewport-controls">
      <label>
        Width:
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          min={100}
        />
      </label>
      <label>
        Height:
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          min={100}
        />
      </label>
    </div>
  );
}
