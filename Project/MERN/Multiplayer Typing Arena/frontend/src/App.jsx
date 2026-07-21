import { useEffect, useMemo, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import api from './api.js'

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [name, setName] = useState(localStorage.getItem('name') || '')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [roomId, setRoomId] = useState('')
  const [text, setText] = useState('')
  const [idx, setIdx] = useState(0)
  const [state, setState] = useState(null)
  const [started, setStarted] = useState(false)
  const [matchId, setMatchId] = useState('')
  const [analytics, setAnalytics] = useState(null)
  const events = useRef([])
  const socket = useRef(null)
  const errors = useRef(0)

  useEffect(() => {
    if (!token) return
    socket.current = io('/')
    socket.current.on('state', setState)
    socket.current.on('start', () => setStarted(true))
    socket.current.on('finished', async ({ matchId }) => {
      setMatchId(matchId)
      setAnalytics((await api.get('/matches/' + matchId + '/analytics')).data)
    })
    socket.current.on('cheat', (m) => alert(m))
    return () => socket.current?.disconnect()
  }, [token])

  const accuracy = useMemo(
    () => (idx === 0 ? 100 : Math.max(0, Math.round(100 * (1 - errors.current / Math.max(1, idx))))),
    [idx]
  )

  useEffect(() => {
    const onKey = (e) => {
      if (!started || !text) return
      const ch = e.key
      if (ch.length !== 1) return
      e.preventDefault()
      if (ch === text[idx]) {
        const next = idx + 1
        events.current.push({ t: Date.now(), idx: next })
        setIdx(next)
        socket.current.emit('progress', { idx: next, correct: accuracy, events: events.current })
      } else {
        errors.current++
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!token) {
    return (
      <div className="wrap">
        <h1>Typing Arena</h1>
        <div className="card row">
          <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button onClick={async () => { const { data } = await api.post('/auth/register', form); localStorage.setItem('token', data.token); localStorage.setItem('name', data.user.name); setToken(data.token); setName(data.user.name) }}>Register</button>
          <button onClick={async () => { const { data } = await api.post('/auth/login', form); localStorage.setItem('token', data.token); localStorage.setItem('name', data.user.name); setToken(data.token); setName(data.user.name) }}>Login</button>
        </div>
      </div>
    )
  }

  return (
    <div className="wrap" tabIndex={0}>
      <h1>Realtime Typing Arena</h1>
      <div className="card row">
        <button onClick={() => socket.current.emit('create', { name }, (r) => { setRoomId(r.roomId); setText(r.text); setIdx(0) })}>Create room</button>
        <input placeholder="Room id" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
        <button onClick={() => socket.current.emit('join', { roomId, name }, (r) => { if (r.error) return alert(r.error); setText(r.text); setIdx(0) })}>Join</button>
        <button onClick={() => socket.current.emit('start')}>Start race</button>
      </div>
      <div className="card">
        <div className="muted">Room {roomId}</div>
        <p className="text">{[...text].map((c, i) => <span key={i} className={i < idx ? 'done' : i === idx ? 'curr' : ''}>{c}</span>)}</p>
      </div>
      <div className="card">
        {state && Object.values(state.players).map((p, i) => (
          <div key={i} className="muted">{p.name}: {p.wpm} WPM · {p.accuracy}% · {p.idx}/{text.length}</div>
        ))}
      </div>
      {analytics && (
        <div className="card">
          <h3>Post-match analytics</h3>
          {analytics.ranked.map((p, i) => <div key={i}>{i + 1}. {p.user} — {p.wpm} WPM</div>)}
          <button onClick={async () => { const { data } = await api.get('/matches/' + matchId); alert('Replay events: ' + JSON.stringify(data.players.map((p) => p.events.length))) }}>Load replay</button>
        </div>
      )}
    </div>
  )
}
