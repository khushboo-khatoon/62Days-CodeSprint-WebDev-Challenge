import { useEffect, useState } from 'react'
import api from './api.js'
export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [url, setUrl] = useState('https://github.com/expressjs/express')
  const [scans, setScans] = useState([])
  const [active, setActive] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const load = async () => setScans((await api.get('/scans')).data)
  useEffect(() => { if (token) load() }, [token])
  if (!token) return (
    <div className="wrap"><h1>License Compliance Scanner</h1>
      <div className="card row">
        <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button onClick={async () => { const { data } = await api.post('/auth/register', form); localStorage.setItem('token', data.token); setToken(data.token) }}>Register</button>
        <button onClick={async () => { const { data } = await api.post('/auth/login', form); localStorage.setItem('token', data.token); setToken(data.token) }}>Login</button>
      </div>
    </div>
  )
  return (
    <div className="wrap">
      <h1>License Compliance Scanner</h1>
      <div className="card row">
        <input style={{ flex: 1, minWidth: 240 }} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="GitHub repo URL" />
        <button disabled={loading} onClick={async () => {
          setLoading(true); setError('')
          try { const { data } = await api.post('/scans', { repoUrl: url }); setActive(data); load() }
          catch (e) { setError(e.response?.data?.message || 'Scan failed') }
          finally { setLoading(false) }
        }}>{loading ? 'Scanning…' : 'Scan'}</button>
      </div>
      {error && <p className="muted">{error}</p>}
      <div className="card">
        <h3>History</h3>
        {!scans.length && <p className="muted">No scans yet.</p>}
        {scans.map((s) => (
          <div key={s._id} className="row" style={{ justifyContent: 'space-between' }}>
            <span>{s.repoUrl}</span>
            <button onClick={() => setActive(s)}>Open</button>
          </div>
        ))}
      </div>
      {active && (
        <div className="card">
          <h3>Report</h3>
          <p className="muted">Total {active.summary?.total} · copyleft {active.summary?.copyleft} · unknown {active.summary?.unknown}</p>
          <button onClick={async () => { const { data } = await api.get('/scans/' + active._id + '/export.csv'); const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([data], { type: 'text/csv' })); a.download = 'scan.csv'; a.click() }}>Export CSV</button>
          <button onClick={() => window.print()}>Print / PDF</button>
          {(active.deps || []).map((d) => (
            <div key={d.name}>
              <strong>{d.name}</strong> <span className={'risk-' + d.risk}>{d.license} · {d.risk}</span>
              <div className="muted">{d.explanation}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
