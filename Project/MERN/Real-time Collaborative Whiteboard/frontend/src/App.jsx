import { useState } from 'react'
import Lobby from './components/Lobby'
import Whiteboard from './components/Whiteboard'

export default function App() {
  const [session, setSession] = useState(null)

  return session ? (
    <Whiteboard session={session} onLeave={() => setSession(null)} />
  ) : (
    <Lobby onJoin={setSession} />
  )
}
