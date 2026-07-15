import { useMemo, useState } from 'react'
import { randomColor } from '../utils/canvas'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

export default function Lobby({ onJoin }) {
  const [name, setName] = useState(() => localStorage.getItem('wb-name') || '')
  const [roomId, setRoomId] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const color = useMemo(() => randomColor(), [])

  const enter = (id) => {
    const trimmedName = name.trim() || 'Guest'
    localStorage.setItem('wb-name', trimmedName)
    onJoin({ roomId: id, name: trimmedName, color })
  }

  const createRoom = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/rooms`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to create room')
      enter(data.roomId)
    } catch (err) {
      setError(err.message || 'Could not reach server. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  const joinRoom = (e) => {
    e.preventDefault()
    const id = roomId.trim().toLowerCase()
    if (!id) {
      setError('Enter a room code to join.')
      return
    }
    enter(id)
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-10 animate-fade-up">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-sky)]">
        Socket.io · Canvas · Rooms
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-[var(--color-ink)]">
        Collaborative Whiteboard
      </h1>
      <p className="mt-3 text-[var(--color-muted)]">
        Create a room, share the code, and draw together with live cursors and PNG export.
      </p>

      <div className="mt-8 space-y-4 rounded-2xl border border-black/5 bg-white/90 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-muted)]">
            Display name
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={24}
            className="w-full rounded-xl border border-slate-200 bg-[var(--color-mist)] px-4 py-3 outline-none focus:border-[var(--color-board)] focus:ring-2 focus:ring-[var(--color-board)]/20"
          />
        </label>

        <button
          type="button"
          disabled={loading}
          onClick={createRoom}
          className="w-full rounded-xl bg-[var(--color-board)] py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:opacity-60"
        >
          {loading ? 'Creating…' : 'Create new room'}
        </button>

        <div className="relative py-2 text-center text-xs font-medium text-[var(--color-muted)]">
          <span className="bg-white px-2">or join existing</span>
          <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-slate-200" />
        </div>

        <form onSubmit={joinRoom} className="flex gap-2">
          <input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Room code"
            className="flex-1 rounded-xl border border-slate-200 bg-[var(--color-mist)] px-4 py-3 outline-none focus:border-[var(--color-sky)] focus:ring-2 focus:ring-[var(--color-sky)]/20"
          />
          <button
            type="submit"
            className="rounded-xl bg-[var(--color-sky)] px-4 py-3 text-sm font-semibold text-white hover:bg-sky-700"
          >
            Join
          </button>
        </form>
      </div>
    </div>
  )
}
