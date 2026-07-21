import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import api from '../api/client.js';
import LineChart from '../components/LineChart.jsx';
import BarChart from '../components/BarChart.jsx';

export default function LinkDetail() {
  const { id } = useParams();
  const [link, setLink] = useState(null);
  const [summary, setSummary] = useState(null);
  const [breakdown, setBreakdown] = useState(null);
  const [qrcode, setQrcode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [linkRes, summaryRes, breakdownRes] = await Promise.all([
        api.get(`/links/${id}`),
        api.get(`/analytics/${id}/summary`),
        api.get(`/analytics/${id}/breakdown`),
      ]);
      setLink(linkRes.data.link);
      setSummary(summaryRes.data);
      setBreakdown(breakdownRes.data);
      setLoading(false);
    };
    load();
  }, [id]);

  const loadQr = async () => {
    const { data } = await api.get(`/links/${id}/qrcode`);
    setQrcode(data.qrcode);
  };

  if (loading) return <div className="spinner" />;
  if (!link) return <p>Link not found.</p>;

  const dayLabels = summary.byDay.map((d) => d._id.slice(5));
  const dayCounts = summary.byDay.map((d) => d.count);

  return (
    <div>
      <RouterLink to="/dashboard" className="helper-text">
        &larr; Back to dashboard
      </RouterLink>
      <h1 className="page-title" style={{ marginTop: '0.5rem' }}>
        {link.title || link.slug}
      </h1>
      <p className="page-subtitle">
        {link.shortUrl} &rarr; <span title={link.originalUrl}>{link.originalUrl}</span>
      </p>

      <div className="grid grid-3" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card">
          <div className="label">Total clicks</div>
          <div className="value">{summary.totalClicks}</div>
        </div>
        <div className="stat-card">
          <div className="label">Unique visitors</div>
          <div className="value">{summary.uniqueVisitors}</div>
        </div>
        <div className="stat-card">
          <div className="label">Status</div>
          <div className="value" style={{ fontSize: '1.1rem' }}>
            {link.isActive ? 'Active' : 'Paused'}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginTop: 0 }}>Clicks over the last 30 days</h3>
        {dayCounts.length === 0 ? (
          <p className="empty-state">No clicks recorded yet. Share your link to see data here.</p>
        ) : (
          <LineChart labels={dayLabels} data={dayCounts} />
        )}
      </div>

      <div className="grid grid-2" style={{ marginBottom: '1.5rem' }}>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Devices</h3>
          {breakdown.devices.length === 0 ? (
            <p className="empty-state">No data yet</p>
          ) : (
            <BarChart labels={breakdown.devices.map((d) => d._id)} data={breakdown.devices.map((d) => d.count)} />
          )}
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Browsers</h3>
          {breakdown.browsers.length === 0 ? (
            <p className="empty-state">No data yet</p>
          ) : (
            <BarChart labels={breakdown.browsers.map((d) => d._id)} data={breakdown.browsers.map((d) => d.count)} />
          )}
        </div>
      </div>

      <div className="grid grid-2" style={{ marginBottom: '1.5rem' }}>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Top referrers</h3>
          {breakdown.referrers.length === 0 ? (
            <p className="empty-state">No data yet</p>
          ) : (
            <BarChart
              horizontal
              labels={breakdown.referrers.map((d) => d._id)}
              data={breakdown.referrers.map((d) => d.count)}
            />
          )}
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Top countries</h3>
          {breakdown.countries.length === 0 ? (
            <p className="empty-state">No data yet</p>
          ) : (
            <BarChart
              horizontal
              labels={breakdown.countries.map((d) => d._id)}
              data={breakdown.countries.map((d) => d.count)}
            />
          )}
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>QR Code</h3>
        {qrcode ? (
          <img src={qrcode} alt="QR code" className="qr-preview" />
        ) : (
          <button className="btn secondary" onClick={loadQr}>
            Generate QR code
          </button>
        )}
      </div>
    </div>
  );
}
