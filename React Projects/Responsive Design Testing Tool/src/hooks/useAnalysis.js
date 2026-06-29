// src/hooks/useAnalysis.js
import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

// Simple mock analysis that pretends to evaluate responsiveness
export function useAnalysis() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useLocalStorage('analysisHistory', []);

  const analyze = async (url, preset) => {
    if (!url) {
      setError('No URL provided');
      return;
    }
    setLoading(true);
    setError(null);
    // Simulate async work
    await new Promise((res) => setTimeout(res, 800));
    const mockResult = {
      url,
      preset,
      score: Math.floor(Math.random() * 100), // random score 0-99
      issues: [],
      timestamp: Date.now(),
    };
    setResult(mockResult);
    // Save to history
    setHistory((prev) => [...prev, mockResult]);
    setLoading(false);
  };

  return { result, loading, error, analyze };
}
