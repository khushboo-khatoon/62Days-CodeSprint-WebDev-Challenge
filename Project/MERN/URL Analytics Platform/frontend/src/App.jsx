import { useEffect, useState } from 'react'
import api from './api.js'

export default function App() {
  const [auth, setAuth] = useState(() => localStorage.getItem('token'))
  const [form, setForm] = useState({ email: '', password: '', name: '' })
  const [links, setLinks] = useState([])
  const [url, setUrl] = useState('')
  const [alias, setAlias] = useState('')
  const [utm, setUtm] = useState({ baseUrl: '', source: '', medium: '', campaign: '' })
  const [built, setBuilt] = useState('')
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true); setError('')
    try { const { data } = await api.get('/links'); setLinks(data) }
    catch (e) { setError(e.response?.data?.message || 'Failed to load') }
    finally { setLoading(false) }
  }

  useEffect(() => { if (auth) load() }, [auth])

  const register = async (isLogin) => {
    try {
      const { data } = await api.post('/auth/' + (isLogin ? 'login' : 'register'), form)
      localStorage.setItem('token', data.token); setAuth(data.token)
    } catch (e) { setError(e.response?.data?.message || 'Auth failed') }
  }

  if (!auth) return (
    <div className="wrap">
      <h1>URL Analytics Platform</h1>
      <div className="card">
        <div className="row">
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
          <button onClick={()=>register(false)}>Register</button>
          <button onClick={()=>register(true)}>Login</button>
        </div>
        {error && <p className="muted">{error}</p>}
      </div>
    </div>
  )

  return (
    <div className="wrap">
      <h1>URL Analytics Platform</h1>
      <p className="muted">Short links · click analytics · UTM · QR · API keys</p>
      <div className="card">
        <div className="row">
          <input style={{flex:1,minWidth:220}} placeholder="https://example.com" value={url} onChange={e=>setUrl(e.target.value)} />
          <input placeholder="alias (optional)" value={alias} onChange={e=>setAlias(e.target.value)} />
          <button onClick={async()=>{ await api.post('/links',{originalUrl:url,alias}); setUrl(''); setAlias(''); load() }}>Create</button>
          <button onClick={()=>{localStorage.removeItem('token'); setAuth(null)}}>Logout</button>
        </div>
      </div>
      <div className="card">
        <h3>UTM builder</h3>
        <div className="row">
          <input placeholder="Base URL" value={utm.baseUrl} onChange={e=>setUtm({...utm,baseUrl:e.target.value})} />
          <input placeholder="source" value={utm.source} onChange={e=>setUtm({...utm,source:e.target.value})} />
          <input placeholder="medium" value={utm.medium} onChange={e=>setUtm({...utm,medium:e.target.value})} />
          <input placeholder="campaign" value={utm.campaign} onChange={e=>setUtm({...utm,campaign:e.target.value})} />
          <button onClick={async()=>{ const {data}=await api.post('/links/utm/build',utm); setBuilt(data.url)}}>Build</button>
        </div>
        {built && <p className="muted">{built}</p>}
      </div>
      <div className="card">
        <h3>Your links</h3>
        {loading && <p className="muted">Loading…</p>}
        {!loading && !links.length && <p className="muted">No links yet — create one above.</p>}
        {links.map(l => (
          <div key={l._id} className="row" style={{justifyContent:'space-between',marginBottom:8}}>
            <div>
              <strong>{l.slug}</strong> → {l.originalUrl}
              <div className="muted">{l.clicks?.length || 0} clicks</div>
            </div>
            <div className="row">
              <button onClick={async()=>{ const {data}=await api.get('/links/'+l._id+'/analytics'); setAnalytics(data)}}>Analytics</button>
              <button onClick={async()=>{ const {data}=await api.get('/links/'+l._id+'/qr'); const a=document.createElement('a'); a.href=data.qr; a.download=l.slug+'.png'; a.click()}}>QR</button>
            </div>
          </div>
        ))}
      </div>
      {analytics && (
        <div className="card">
          <h3>Analytics · {analytics.total} clicks</h3>
          <div className="chart">
            {(analytics.byDevice || []).map(d => (
              <div key={d._id} title={d._id} className="bar" style={{height: Math.max(8, d.count * 12)}} />
            ))}
          </div>
          <p className="muted">Bars = device breakdown (hover for label via title)</p>
        </div>
      )}
      {error && <p className="muted">{error}</p>}
    </div>
  )
}
