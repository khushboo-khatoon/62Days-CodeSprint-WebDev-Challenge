import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import api from '../api/client.js';
import CreateLinkForm from '../components/CreateLinkForm.jsx';

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  const load = async () => {
    setLoading(true);
    const [linksRes, overviewRes] = await Promise.all([
      api.get('/links'),
      api.get('/analytics/overview'),
    ]);
    setLinks(linksRes.data.links);
    setOverview(overviewRes.data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link.shortUrl);
    setCopiedId(link._id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this link and all of its click history?')) return;
    await api.delete(`/links/${id}`);
    setLinks((prev) => prev.filter((l) => l._id !== id));
  };

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Create, share and track short links.</p>

      {overview && (
        <div className="grid grid-3" style={{ marginBottom: '1.5rem' }}>
          <div className="stat-card">
            <div className="label">Total links</div>
            <div className="value">{overview.totalLinks}</div>
          </div>
          <div className="stat-card">
            <div className="label">Total clicks</div>
            <div className="value">{overview.totalClicks}</div>
          </div>
          <div className="stat-card">
            <div className="label">Clicks (7 days)</div>
            <div className="value">{overview.last7.reduce((a, d) => a + d.count, 0)}</div>
          </div>
        </div>
      )}

      <div className="section-header">
        <h3 style={{ margin: 0 }}>Create a new link</h3>
      </div>
      <CreateLinkForm onCreated={(link) => setLinks((prev) => [link, ...prev])} />

      <div className="section-header" style={{ marginTop: '2rem' }}>
        <h3 style={{ margin: 0 }}>Your links</h3>
      </div>

      {loading ? (
        <div className="spinner" />
      ) : links.length === 0 ? (
        <div className="card empty-state">
          <p>You haven't created any short links yet.</p>
          <p className="helper-text">Use the form above to create your first one.</p>
        </div>
      ) : (
        <div className="card" style={{ padding: 0 }}>
          <table>
            <thead>
              <tr>
                <th>Link</th>
                <th>Destination</th>
                <th>Clicks</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link._id}>
                  <td>
                    <RouterLink to={`/links/${link._id}`}>{link.title || link.slug}</RouterLink>
                    <div className="helper-text">{link.shortUrl}</div>
                  </td>
                  <td className="link-row-url" title={link.originalUrl}>
                    {link.originalUrl}
                  </td>
                  <td>
                    <span className="badge">{link.clicksCount}</span>
                  </td>
                  <td>{new Date(link.createdAt).toLocaleDateString()}</td>
                  <td style={{ display: 'flex', gap: '0.4rem' }}>
                    <button className="btn secondary" onClick={() => handleCopy(link)}>
                      {copiedId === link._id ? 'Copied!' : 'Copy'}
                    </button>
                    <button className="btn danger" onClick={() => handleDelete(link._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
