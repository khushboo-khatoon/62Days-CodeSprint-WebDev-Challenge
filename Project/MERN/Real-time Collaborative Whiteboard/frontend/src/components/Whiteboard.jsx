import { useCallback, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { drawStroke, redrawAll } from '../utils/canvas'

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'
const COLORS = ['#0f766e', '#0284c7', '#c2410c', '#7c3aed', '#be123c', '#171717', '#ca8a04']

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export default function Whiteboard({ session, onLeave }) {
  const canvasRef = useRef(null)
  const socketRef = useRef(null)
  const strokesRef = useRef([])
  const drawingRef = useRef(false)
  const currentStrokeRef = useRef(null)
  const cursorsRef = useRef({})
  const lastCursorEmit = useRef(0)

  const [tool, setTool] = useState('pen')
  const [color, setColor] = useState(COLORS[0])
  const [size, setSize] = useState(4)
  const [users, setUsers] = useState([])
  const [cursors, setCursors] = useState({})
  const [status, setStatus] = useState('connecting')
  const [copied, setCopied] = useState(false)

  const getPoint = useCallback((e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    }
  }, [])

  const paint = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    redrawAll(ctx, strokesRef.current, canvas.width, canvas.height)
    if (currentStrokeRef.current) {
      drawStroke(ctx, currentStrokeRef.current)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const parent = canvas.parentElement
      const width = Math.max(640, parent?.clientWidth || 960)
      const height = Math.max(420, Math.floor(width * 0.62))
      canvas.width = width
      canvas.height = height
      paint()
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [paint])

  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ['websocket', 'polling'] })
    socketRef.current = socket

    socket.on('connect', () => {
      setStatus('connected')
      socket.emit('room:join', session)
    })

    socket.on('disconnect', () => setStatus('disconnected'))

    socket.on('room:state', ({ strokes, users: roomUsers }) => {
      strokesRef.current = strokes || []
      setUsers(roomUsers || [])
      paint()
    })

    socket.on('draw:stroke', (stroke) => {
      strokesRef.current = [...strokesRef.current, stroke]
      const canvas = canvasRef.current
      if (!canvas) return
      drawStroke(canvas.getContext('2d'), stroke)
    })

    socket.on('board:cleared', () => {
      strokesRef.current = []
      paint()
    })

    socket.on('room:users', (roomUsers) => setUsers(roomUsers || []))

    socket.on('cursor:move', (cursor) => {
      if (cursor.id === socket.id) return
      cursorsRef.current = { ...cursorsRef.current, [cursor.id]: cursor }
      setCursors({ ...cursorsRef.current })
    })

    socket.on('user:left', ({ id }) => {
      const next = { ...cursorsRef.current }
      delete next[id]
      cursorsRef.current = next
      setCursors(next)
    })

    socket.on('error:message', ({ message }) => {
      setStatus(message || 'error')
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [session, paint])

  const startDraw = (e) => {
    e.preventDefault()
    drawingRef.current = true
    const point = getPoint(e)
    currentStrokeRef.current = {
      id: uid(),
      tool,
      color,
      size,
      points: [point],
    }
    paint()
  }

  const moveDraw = (e) => {
    e.preventDefault()
    const point = getPoint(e)
    const now = Date.now()

    if (now - lastCursorEmit.current > 40 && socketRef.current) {
      lastCursorEmit.current = now
      socketRef.current.emit('cursor:move', point)
    }

    if (!drawingRef.current || !currentStrokeRef.current) return
    currentStrokeRef.current.points.push(point)
    paint()
  }

  const endDraw = () => {
    if (!drawingRef.current || !currentStrokeRef.current) return
    drawingRef.current = false
    const stroke = currentStrokeRef.current
    currentStrokeRef.current = null
    strokesRef.current = [...strokesRef.current, stroke]
    socketRef.current?.emit('draw:stroke', stroke)
    paint()
  }

  const clearBoard = () => {
    if (!window.confirm('Clear the board for everyone in this room?')) return
    socketRef.current?.emit('board:clear')
  }

  const exportPng = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `whiteboard-${session.roomId}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const copyRoom = async () => {
    try {
      await navigator.clipboard.writeText(session.roomId)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-3 animate-fade-up">
        <div>
          <h1 className="font-display text-2xl font-bold">Room {session.roomId}</h1>
          <p className="text-sm text-[var(--color-muted)]">
            Signed in as <span className="font-semibold text-[var(--color-ink)]">{session.name}</span>
            {' · '}
            <span className={status === 'connected' ? 'text-teal-700' : 'text-amber-600'}>
              {status}
            </span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={copyRoom}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium"
          >
            {copied ? 'Copied!' : 'Copy room code'}
          </button>
          <button
            type="button"
            onClick={exportPng}
            className="rounded-xl bg-[var(--color-sky)] px-3 py-2 text-sm font-semibold text-white"
          >
            Export PNG
          </button>
          <button
            type="button"
            onClick={onLeave}
            className="rounded-xl bg-slate-800 px-3 py-2 text-sm font-semibold text-white"
          >
            Leave
          </button>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-black/5 bg-white/90 p-3 shadow-sm">
        <div className="flex gap-1">
          {['pen', 'eraser'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTool(t)}
              className={`rounded-lg px-3 py-2 text-sm font-semibold capitalize ${
                tool === t
                  ? 'bg-[var(--color-board)] text-white'
                  : 'bg-[var(--color-mist)] text-[var(--color-muted)]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              aria-label={`Color ${c}`}
              onClick={() => {
                setColor(c)
                setTool('pen')
              }}
              className={`h-8 w-8 rounded-full border-2 ${
                color === c && tool === 'pen' ? 'border-slate-900 scale-110' : 'border-white'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
          Size
          <input
            type="range"
            min="2"
            max="24"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </label>

        <button
          type="button"
          onClick={clearBoard}
          className="ml-auto rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600"
        >
          Clear board
        </button>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="relative flex-1 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_12px_36px_rgba(15,23,42,0.08)]">
          <canvas
            ref={canvasRef}
            className="block h-auto w-full touch-none cursor-crosshair"
            onMouseDown={startDraw}
            onMouseMove={moveDraw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw}
            onTouchMove={moveDraw}
            onTouchEnd={endDraw}
          />

          {Object.values(cursors).map((c) => (
            <div
              key={c.id}
              className="pointer-events-none absolute z-10 -translate-x-1 -translate-y-1 transition-transform duration-75"
              style={{
                left: `${(c.x / (canvasRef.current?.width || 1)) * 100}%`,
                top: `${(c.y / (canvasRef.current?.height || 1)) * 100}%`,
              }}
            >
              <div
                className="h-3 w-3 rotate-45 rounded-[2px]"
                style={{ backgroundColor: c.color }}
              />
              <span
                className="mt-1 block max-w-[8rem] truncate rounded px-1.5 py-0.5 text-[10px] font-semibold text-white"
                style={{ backgroundColor: c.color }}
              >
                {c.name}
              </span>
            </div>
          ))}
        </div>

        <aside className="w-full shrink-0 rounded-2xl border border-black/5 bg-white/90 p-4 lg:w-56">
          <h2 className="text-sm font-semibold text-[var(--color-muted)]">
            Online ({users.length})
          </h2>
          <ul className="mt-3 space-y-2">
            {users.map((u) => (
              <li key={u.id} className="flex items-center gap-2 text-sm">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: u.color }}
                />
                <span className="truncate font-medium">{u.name}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}
