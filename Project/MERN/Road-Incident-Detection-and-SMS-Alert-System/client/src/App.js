import React from 'react';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>RESQ: Road Incident Detection & SMS Alert System</h1>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;