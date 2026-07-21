import { Router } from 'express';
import Match from '../models/Match.js';
import { auth } from '../middleware/auth.js';
const r = Router();
r.get('/:id', auth, async (req, res) => res.json(await Match.findById(req.params.id)));
r.get('/:id/analytics', auth, async (req, res) => {
  const m = await Match.findById(req.params.id);
  if (!m) return res.status(404).json({ message: 'Not found' });
  const ranked = [...m.players].sort((a, b) => b.wpm - a.wpm);
  res.json({
    durationMs: (m.endedAt && m.startedAt) ? (m.endedAt - m.startedAt) : null,
    ranked, textLength: m.text.length
  });
});
export default r;
