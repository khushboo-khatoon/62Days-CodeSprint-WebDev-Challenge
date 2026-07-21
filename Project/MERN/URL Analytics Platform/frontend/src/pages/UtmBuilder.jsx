import { useState } from 'react';
import api from '../api/client.js';

export default function UtmBuilder() {
  const [form, setForm] = useState({
    baseUrl: '',
    source: '',
    medium: '',
    campaign: '',
    term: '',
    content: '',
  });
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/utm/build', form);
      setResult(data.url);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not build URL');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <h1 className="page-title">UTM Builder</h1>
      <p className="page-subtitle">Build campaign-tagged URLs to measure marketing performance.</p>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Website URL</label>
            <input
              required
              type="url"
              placeholder="https://example.com/landing"
              value={form.baseUrl}
              onChange={(e) => setForm({ ...form, baseUrl: e.target.value })}
            />
          </div>
          <div className="grid grid-2">
            <div className="form-group">
              <label>Campaign Source (utm_source)</label>
              <input
                placeholder="newsletter"
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Campaign Medium (utm_medium)</label>
              <input
                placeholder="email"
                value={form.medium}
                onChange={(e) => setForm({ ...form, medium: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Campaign Name (utm_campaign)</label>
              <input
                placeholder="summer-sale"
                value={form.campaign}
                onChange={(e) => setForm({ ...form, campaign: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Campaign Term (utm_term)</label>
              <input value={form.term} onChange={(e) => setForm({ ...form, term: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label>Campaign Content (utm_content)</label>
            <input value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button className="btn" type="submit">
            Build URL
          </button>
        </form>

        {result && (
          <div style={{ marginTop: '1.25rem' }}>
            <label className="helper-text">Generated URL</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35rem' }}>
              <input readOnly value={result} style={{ flex: 1 }} />
              <button className="btn secondary" onClick={handleCopy}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
