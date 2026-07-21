import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import authRoutes from './src/routes/auth.js';
import matchRoutes from './src/routes/matches.js';
import Match from './src/models/Match.js';
import User from './src/models/User.js';

const TEXTS = [
  'The quick brown fox jumps over the lazy dog near the river bank.',
  'Open source contributions teach collaboration, patience, and clean code habits.'
];
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/matches', matchRoutes);
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
const rooms = new Map();

io.on('connection', (socket) => {
  socket.on('create', ({ name }, cb) => {
    const roomId = Math.random().toString(36).slice(2, 8);
    const text = TEXTS[Math.floor(Math.random() * TEXTS.length)];
    rooms.set(roomId, { text, players: {}, startedAt: null, matchId: null });
    socket.join(roomId);
    socket.data.roomId = roomId;
    socket.data.name = name;
    rooms.get(roomId).players[socket.id] = { name, idx: 0, wpm: 0, accuracy: 100, events: [] };
    cb?.({ roomId, text });
    io.to(roomId).emit('state', rooms.get(roomId));
  });
  socket.on('join', ({ roomId, name }, cb) => {
    const room = rooms.get(roomId);
    if (!room) return cb?.({ error: 'missing' });
    socket.join(roomId);
    socket.data.roomId = roomId;
    socket.data.name = name;
    room.players[socket.id] = { name, idx: 0, wpm: 0, accuracy: 100, events: [] };
    cb?.({ roomId, text: room.text });
    io.to(roomId).emit('state', room);
  });
  socket.on('start', async () => {
    const roomId = socket.data.roomId;
    const room = rooms.get(roomId);
    if (!room) return;
    room.startedAt = Date.now();
    const match = await Match.create({ roomId, text: room.text, players: [], startedAt: new Date() });
    room.matchId = match._id;
    io.to(roomId).emit('start', { startedAt: room.startedAt });
  });
  socket.on('progress', async ({ idx, correct, events }) => {
    const roomId = socket.data.roomId;
    const room = rooms.get(roomId);
    if (!room || !room.startedAt) return;
    const elapsedMin = Math.max(0.01, (Date.now() - room.startedAt) / 60000);
    const wpm = Math.round((idx / 5) / elapsedMin);
    if (wpm > 220) return socket.emit('cheat', 'Implausible WPM');
    const last = room.players[socket.id].events.at(-1);
    if (last && idx - last.idx > 12 && (Date.now() - room.startedAt) - last.t < 80) {
      return socket.emit('cheat', 'Typing burst flagged');
    }
    room.players[socket.id] = {
      ...room.players[socket.id], idx, wpm, accuracy: correct,
      events: events || room.players[socket.id].events
    };
    io.to(roomId).emit('state', room);
    if (idx >= room.text.length) {
      room.players[socket.id].finishedAt = Date.now();
      const allDone = Object.values(room.players).every((p) => p.finishedAt || p.idx >= room.text.length);
      if (allDone) {
        const players = Object.values(room.players).map((p) => ({
          user: p.name, wpm: p.wpm, accuracy: p.accuracy,
          finishedAt: p.finishedAt ? new Date(p.finishedAt) : new Date(), events: p.events
        }));
        await Match.findByIdAndUpdate(room.matchId, { players, endedAt: new Date() });
        for (const p of players) {
          await User.findOneAndUpdate({ name: p.user }, { $inc: { races: 1 }, $max: { bestWpm: p.wpm } });
        }
        io.to(roomId).emit('finished', { matchId: room.matchId, players });
      }
    }
  });
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/typing_arena')
  .then(() => server.listen(process.env.PORT || 5000, () => console.log('Typing Arena API')));
