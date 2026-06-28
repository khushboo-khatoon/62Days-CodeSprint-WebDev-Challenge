// src/components/ContributionDashboard/GitHubConnect.tsx
import React, { useState } from 'react';
import { getContributionSummary } from '../../services/githubService';

export const GitHubConnect: React.FC = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  const handleConnect = async () => {
    setLoading(true);
    setError(null);
    try {
      // Mocked – just call service to simulate delay
      await getContributionSummary();
      setConnected(true);
    } catch {
      setError('Failed to connect to GitHub');
    } finally {
      setLoading(false);
    }
  };

  if (connected) {
    return <p className="text-green-600">Connected as {username || 'mock user'}</p>;
  }

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="github-username" className="text-sm font-medium text-foreground">
        GitHub Username
      </label>
      <input
        id="github-username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="e.g. octocat"
      />
      <button
        onClick={handleConnect}
        disabled={loading}
        className="bg-primary text-primary-foreground rounded-md px-4 py-2 hover:bg-primary/80 disabled:opacity-50"
      >
        {loading ? 'Connecting...' : 'Connect'}
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
};
