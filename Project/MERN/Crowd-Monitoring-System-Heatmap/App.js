import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [isDetecting, setIsDetecting] = useState(false);
  const [stats, setStats] = useState({ people_count: 0, cluster_count: 0 });
  const [frame, setFrame] = useState(null);
  const [error, setError] = useState('');

  const intervalRef = useRef(null);

  const fetchFrame = async () => {
    try {
      const res = await fetch('/api/detection/frame');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data.frame) {
        setFrame(`data:image/jpeg;base64,${data.frame}`);
        setStats({
          people_count: data.people_count,
          cluster_count: data.cluster_count,
        });
      }
    } catch (e) {
      console.error("Failed to fetch frame:", e);
      setError('Failed to connect to the server. Is it running?');
      // Stop polling if there's an error
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsDetecting(false);
    }
  };

  const handleStart = async () => {
    try {
      setError('');
      const res = await fetch('/api/detection/start', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to start detection.');
      setIsDetecting(true);
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  };

  const handleStop = async () => {
    try {
      const res = await fetch('/api/detection/stop', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to stop detection.');
      setIsDetecting(false);
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  };

  useEffect(() => {
    if (isDetecting) {
      // Start polling
      intervalRef.current = setInterval(fetchFrame, 200); // Poll every 200ms
    } else {
      // Stop polling
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    // Cleanup on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isDetecting]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Crowd & Cluster Monitoring Dashboard</h1>
      </header>
      <main>
        <div className="controls">
          {!isDetecting ? (
            <button onClick={handleStart} className="control-button start">Start Detection</button>
          ) : (
            <button onClick={handleStop} className="control-button stop">Stop Detection</button>
          )}
        </div>
        <div className="dashboard">
          <div className="video-feed">
            {frame ? (
              <img src={frame} alt="Live feed" />
            ) : (
              <div className="placeholder">
                <span>{isDetecting ? 'Connecting to stream...' : 'Detection is stopped'}</span>
              </div>
            )}
          </div>
          <div className="stats-panel">
            <h2>Real-Time Statistics</h2>
            <div className="stat-item">
              <span className="stat-label">People Count:</span>
              <span className="stat-value">{stats.people_count}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Cluster Count:</span>
              <span className="stat-value">{stats.cluster_count}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Status:</span>
              <span className={`stat-value status ${isDetecting ? 'active' : 'inactive'}`}>
                {isDetecting ? 'Running' : 'Stopped'}
              </span>
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;