import { useState } from 'react';
import api from '../api/client.js';

export default function CreateLinkForm({ onCreated }) {
  const [expanded, setExpanded] = useState(false);
  const [form, setForm] = useState({
    title: '',
    originalUrl: '',
    slug: '',
    source: '',
    medium: '',
    campaign: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setForm({ title: '', originalUrl: '', slug: '', source: '', medium: '', campaign: '' });
    setExpanded(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/links', {
        title: form.title,
        originalUrl: form.originalUrl,
        slug: form.slug || undefined,
        utm: { source: form.source, medium: form.medium, campaign: form.campaign },
      });
      onCreated(data.link);
      reset();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-2">
          <div className="form-group">
            <label>Destination URL</label>
            <input
              required
              type="url"
              placeholder="https://example.com/my-page"
              value={form.originalUrl}
              onChange={(e) => setForm({ ...form, originalUrl: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Title (optional)</label>
            <input
              placeholder="Spring campaign"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
        </div>

        <button
          type="button"
          className="btn secondary"
          style={{ marginBottom: '0.9rem' }}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? 'Hide advanced options' : 'Custom slug & UTM tags'}
        </button>

        {expanded && (
          <div className="grid grid-4">
            <div className="form-group">
              <label>Custom slug</label>
              <input
                placeholder="my-link"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>utm_source</label>
              <input value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} />
            </div>
            <div className="form-group">
              <label>utm_medium</label>
              <input value={form.medium} onChange={(e) => setForm({ ...form, medium: e.target.value })} />
            </div>
            <div className="form-group">
              <label>utm_campaign</label>
              <input value={form.campaign} onChange={(e) => setForm({ ...form, campaign: e.target.value })} />
            </div>
          </div>
        )}

        {error && <p className="error-text">{error}</p>}
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create short link'}
        </button>
      </form>
    </div>
  );
}
