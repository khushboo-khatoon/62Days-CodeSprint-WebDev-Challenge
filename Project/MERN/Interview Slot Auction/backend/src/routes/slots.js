import { Router } from 'express';
import mongoose from 'mongoose';
import Slot from '../models/Slot.js';
import { auth, requireRole } from '../middleware/auth.js';
const r = Router();
r.get('/', async (req, res) => res.json(await Slot.find().populate('mentor', 'name email').sort({ start: 1 })));
r.post('/', auth, requireRole('mentor'), async (req, res) => {
  const slot = await Slot.create({
    mentor: req.user.id, title: req.body.title, start: req.body.start, end: req.body.end,
    mode: req.body.mode || 'book', minBid: req.body.minBid || 0, history: [{ status: 'open', note: 'created' }]
  });
  res.status(201).json(slot);
});
r.post('/:id/book', auth, requireRole('mentee'), async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const slot = await Slot.findById(req.params.id).session(session);
    if (!slot || slot.status !== 'open') throw new Error('Slot unavailable');
    if (slot.bookedBy) {
      if (!slot.waitlist.find((id) => String(id) === req.user.id)) slot.waitlist.push(req.user.id);
      slot.history.push({ status: 'waitlisted', note: req.user.email });
      await slot.save({ session });
      await session.commitTransaction();
      return res.status(409).json({ message: 'Already booked — added to waitlist', slot });
    }
    const conflict = await Slot.findOne({
      bookedBy: req.user.id, status: 'booked', start: { $lt: slot.end }, end: { $gt: slot.start }
    }).session(session);
    if (conflict) throw new Error('Scheduling conflict with another booking');
    slot.bookedBy = req.user.id;
    slot.status = 'booked';
    slot.history.push({ status: 'booked', note: 'transaction book' });
    await slot.save({ session });
    await session.commitTransaction();
    res.json(slot);
  } catch (e) {
    await session.abortTransaction();
    res.status(400).json({ message: e.message });
  } finally { session.endSession(); }
});
r.post('/:id/bid', auth, requireRole('mentee'), async (req, res) => {
  const slot = await Slot.findById(req.params.id);
  if (!slot || slot.mode !== 'auction' || slot.status !== 'open') return res.status(400).json({ message: 'Not auctionable' });
  const amount = Number(req.body.amount);
  if (amount < slot.minBid) return res.status(400).json({ message: 'Below min bid' });
  const top = slot.bids.reduce((m, b) => Math.max(m, b.amount), slot.minBid - 1);
  if (amount <= top) return res.status(400).json({ message: 'Bid too low' });
  slot.bids.push({ user: req.user.id, amount });
  slot.history.push({ status: 'bid', note: String(amount) });
  await slot.save();
  res.json(slot);
});
r.post('/:id/close-auction', auth, requireRole('mentor'), async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const slot = await Slot.findOne({ _id: req.params.id, mentor: req.user.id }).session(session);
    if (!slot || !slot.bids.length) throw new Error('No bids');
    const winner = slot.bids.sort((a, b) => b.amount - a.amount)[0];
    slot.bookedBy = winner.user;
    slot.status = 'booked';
    slot.history.push({ status: 'auction-won', note: String(winner.amount) });
    await slot.save({ session });
    await session.commitTransaction();
    res.json(slot);
  } catch (e) {
    await session.abortTransaction();
    res.status(400).json({ message: e.message });
  } finally { session.endSession(); }
});
r.get('/:id/ics', auth, async (req, res) => {
  const slot = await Slot.findById(req.params.id).populate('mentor', 'name');
  if (!slot) return res.status(404).end();
  const dt = (d) => new Date(d).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT',
    'UID:' + slot._id + '@interview-slots',
    'DTSTART:' + dt(slot.start),
    'DTEND:' + dt(slot.end),
    'SUMMARY:' + slot.title,
    'DESCRIPTION:Mentor ' + (slot.mentor?.name || ''),
    'END:VEVENT', 'END:VCALENDAR'
  ];
  res.setHeader('Content-Type', 'text/calendar');
  res.send(lines.join('\r\n'));
});
export default r;
