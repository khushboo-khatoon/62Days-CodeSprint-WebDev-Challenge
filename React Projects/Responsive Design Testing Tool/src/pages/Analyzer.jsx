// src/pages/Analyzer.jsx
import { useSearchParams } from 'react-router-dom';
import DeviceToolbar from '../components/DeviceToolbar/DeviceToolbar';
import ViewportControls from '../components/ViewportControls/ViewportControls';
import WebsiteFrame from '../components/WebsiteFrame/WebsiteFrame';
import { useAnalysis } from '../hooks/useAnalysis';
import { useToast } from '../components/Toast/ToastProvider';
import './Analyzer.css';

export default function Analyzer() {
  const [searchParams] = useSearchParams();
  const site = searchParams.get('site') || '';
  const { result, loading, error, analyze } = useAnalysis();
  const { addToast } = useToast();

  // Run analysis when site changes
  useEffect(() => {
    if (site) {
      analyze(site, 'custom');
    }
  }, [site]);

  useEffect(() => {
    if (result) {
      addToast(`Analysis completed: score ${result.score}`, 'success');
    }
    if (error) {
      addToast(error, 'error');
    }
  }, [result, error]);

  return (
    <section className="analyzer-page">
      <h1>Analyzer</h1>
      <div className="toolbar-section">
        <DeviceToolbar />
        <ViewportControls />
      </div>
      <WebsiteFrame url={site} />
      {loading && <p>Analyzing…</p>}
      {result && (
        <div className="analysis-result">
          <h2>Result</h2>
          <p>Score: {result.score}</p>
          <p>Preset: {result.preset}</p>
          <p>URL: {result.url}</p>
        </div>
      )}
    </section>
  );
}
