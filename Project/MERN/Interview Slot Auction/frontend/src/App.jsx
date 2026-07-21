import { useEffect, useState } from 'react'
import api from './api.js'
export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [role, setRole] = useState(localStorage.getItem('role') || 'mentee')
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'mentee' })
  const [slots, setSlots] = useState([])
  const [title, setTitle] = useState('Mock Interview')
  const [start, setStart] = useState('')
  const load = async () => setSlots((await api.get('/slots')).data)
  useEffect(() => { load() }, [])
  if (!token) return (
    <div className="wrap"><h1>Interview Slot Auction</h1>
      <div className="card row">
        <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="mentee">Mentee</option><option value="mentor">Mentor</option>
        </select>
        <button onClick={async () => { const { data } = await api.post('/auth/register', form); localStorage.setItem('token', data.token); localStorage.setItem('role', data.user.role); setToken(data.token); setRole(data.user.role) }}>Register</button>
        <button onClick={async () => { const { data } = await api.post('/auth/login', form); localStorage.setItem('token', data.token); localStorage.setItem('role', data.user.role); setToken(data.token); setRole(data.user.role) }}>Login</button>
      </div>
    </div>
  )
  return (
    <div className="wrap"><h1>Slots · {role}</h1>
      {role === 'mentor' && (
        <div className="card row">
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} />
          <button onClick={async () => { const s = new Date(start); await api.post('/slots', { title, start: s, end: new Date(s.getTime() + 3600000), mode: 'auction', minBid: 10 }); load() }}>Publish auction</button>
          <button onClick={async () => { const s = new Date(start || Date.now() + 86400000); await api.post('/slots', { title, start: s, end: new Date(s.getTime() + 3600000), mode: 'book' }); load() }}>Publish bookable</button>
        </div>
      )}
      {slots.map((s) => (
        <div className="card" key={s._id}>
          <strong>{s.title}</strong> <span className="muted">{s.mode} · {s.status}</span>
          <div className="muted">{new Date(s.start).toLocaleString()} — mentor {s.mentor?.name}</div>
          <div className="row">
            {role === 'mentee' && s.mode === 'book' && <button onClick={async () => { try { await api.post('/slots/' + s._id + '/book'); load() } catch (e) { alert(e.response?.data?.message) } }}>Book / Waitlist</button>}
            {role === 'mentee' && s.mode === 'auction' && <button onClick={async () => { const amount = Number(prompt('Bid amount', '20')); await api.post('/slots/' + s._id + '/bid', { amount }); load() }}>Bid</button>}
            {role === 'mentor' && s.mode === 'auction' && <button onClick={async () => { await api.post('/slots/' + s._id + '/close-auction'); load() }}>Close auction</button>}
            <button onClick={async () => { const { data } = await api.get('/slots/' + s._id + '/ics'); const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([data], { type: 'text/calendar' })); a.download = 'slot.ics'; a.click() }}>.ics</button>
          </div>
          <div className="muted">History: {(s.history || []).map((h) => h.status).join(' → ')}</div>
        </div>
      ))}
    </div>
  )
}
