const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

/** @type {Map<string, { strokes: object[], users: Map<string, object> }>} */
const rooms = new Map();

function getOrCreateRoom(roomId) {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, { strokes: [], users: new Map() });
  }
  return rooms.get(roomId);
}

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Real-time Collaborative Whiteboard API is running',
  });
});

app.post('/api/rooms', (_req, res) => {
  const roomId = uuidv4().slice(0, 8);
  getOrCreateRoom(roomId);
  res.status(201).json({ roomId });
});

app.get('/api/rooms/:roomId', (req, res) => {
  const room = rooms.get(req.params.roomId);
  if (!room) {
    return res.status(404).json({ message: 'Room not found. Create or join a new room.' });
  }
  res.json({
    roomId: req.params.roomId,
    userCount: room.users.size,
    strokeCount: room.strokes.length,
  });
});

const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('room:join', ({ roomId, name, color }) => {
    if (!roomId || typeof roomId !== 'string') {
      socket.emit('error:message', { message: 'Invalid room id.' });
      return;
    }

    const id = roomId.trim().toLowerCase();
    const room = getOrCreateRoom(id);

    socket.join(id);
    socket.data.roomId = id;
    socket.data.name = (name || 'Guest').slice(0, 24);
    socket.data.color = color || '#14919b';

    room.users.set(socket.id, {
      id: socket.id,
      name: socket.data.name,
      color: socket.data.color,
      x: 0,
      y: 0,
    });

    socket.emit('room:state', {
      roomId: id,
      strokes: room.strokes,
      users: Array.from(room.users.values()),
    });

    socket.to(id).emit('user:joined', {
      id: socket.id,
      name: socket.data.name,
      color: socket.data.color,
    });

    io.to(id).emit('room:users', Array.from(room.users.values()));
  });

  socket.on('draw:stroke', (stroke) => {
    const roomId = socket.data.roomId;
    if (!roomId) return;
    const room = rooms.get(roomId);
    if (!room) return;

    const payload = {
      ...stroke,
      id: stroke.id || uuidv4(),
      userId: socket.id,
    };

    room.strokes.push(payload);
    if (room.strokes.length > 5000) {
      room.strokes.splice(0, room.strokes.length - 5000);
    }

    socket.to(roomId).emit('draw:stroke', payload);
  });

  socket.on('board:clear', () => {
    const roomId = socket.data.roomId;
    if (!roomId) return;
    const room = rooms.get(roomId);
    if (!room) return;

    room.strokes = [];
    io.to(roomId).emit('board:cleared', { by: socket.data.name });
  });

  socket.on('cursor:move', ({ x, y }) => {
    const roomId = socket.data.roomId;
    if (!roomId) return;
    const room = rooms.get(roomId);
    if (!room || !room.users.has(socket.id)) return;

    const user = room.users.get(socket.id);
    user.x = x;
    user.y = y;

    socket.to(roomId).emit('cursor:move', {
      id: socket.id,
      name: user.name,
      color: user.color,
      x,
      y,
    });
  });

  socket.on('disconnect', () => {
    const roomId = socket.data.roomId;
    if (!roomId) return;
    const room = rooms.get(roomId);
    if (!room) return;

    room.users.delete(socket.id);
    socket.to(roomId).emit('user:left', { id: socket.id });
    io.to(roomId).emit('room:users', Array.from(room.users.values()));

    if (room.users.size === 0) {
      rooms.delete(roomId);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Whiteboard server running on port ${PORT}`);
});
