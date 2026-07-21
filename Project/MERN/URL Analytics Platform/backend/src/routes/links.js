import { Router } from 'express';
import { nanoid } from 'nanoid';
import QRCode from 'qrcode';
import Link from '../models/Link.js';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = Router();
const rate = new Map();

function rateLimit(key, limit = 60) {
  const now = Date.now();
  const bucket = rate.get(key) || [];
  const fresh = bucket.filter((t) => now - t < 60_000);
  if (fresh.length >= limit) return false;
  fresh.push(now);
  rate.set(key, fresh);
  return true;
}

function deviceFromUa(ua = '') {
  if (/mobile/i.test(ua)) return 'mobile';
  if (/tablet|ipad/i.test(ua)) return 'tablet';
  return 'desktop';
}

router.post('/', auth, async (req, res) => {
  const { originalUrl, alias, title, utm } = req.body;
  if (!originalUrl) return res.status(400).json({ message: 'originalUrl required' });
  const slug = alias || nanoid(7);
  try {
    const link = await Link.create({ user: req.user.id, originalUrl, slug, title, utm });
    res.status(201).json(link);
  } catch {
    res.status(400).json({ message: 'Alias already taken' });
  }
});

router.get('/', auth, async (req, res) => {
  const links = await Link.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(links);
});

router.get('/:id/analytics', auth, async (req, res) => {
  const link = await Link.findOne({ _id: req.params.id, user: req.user.id });
  if (!link) return res.status(404).json({ message: 'Not found' });
  const byDevice = await Link.aggregate([
    { $match: { _id: link._id } },
    { $unwind: '$clicks' },
    { $group: { _id: '$clicks.device', count: { $sum: 1 } } },
  ]);
  const byReferrer = await Link.aggregate([
    { $match: { _id: link._id } },
    { $unwind: '$clicks' },
    { $group: { _id: '$clicks.referrer', count: { $sum: 1 } } },
  ]);
  const byCountry = await Link.aggregate([
    { $match: { _id: link._id } },
    { $unwind: '$clicks' },
    { $group: { _id: '$clicks.country', count: { $sum: 1 } } },
  ]);
  res.json({ total: link.clicks.length, byDevice, byReferrer, byCountry, clicks: link.clicks.slice(-50) });
});

router.get('/:id/qr', auth, async (req, res) => {
  const link = await Link.findOne({ _id: req.params.id, user: req.user.id });
  if (!link) return res.status(404).json({ message: 'Not found' });
  const url = `${req.protocol}://${req.get('host')}/r/${link.slug}`;
  const dataUrl = await QRCode.toDataURL(url);
  res.json({ url, qr: dataUrl });
});

router.post('/utm/build', auth, (req, res) => {
  const { baseUrl, source, medium, campaign } = req.body;
  if (!baseUrl) return res.status(400).json({ message: 'baseUrl required' });
  const u = new URL(baseUrl);
  if (source) u.searchParams.set('utm_source', source);
  if (medium) u.searchParams.set('utm_medium', medium);
  if (campaign) u.searchParams.set('utm_campaign', campaign);
  res.json({ url: u.toString() });
});

export async function redirectHandler(req, res) {
  const link = await Link.findOne({ slug: req.params.slug });
  if (!link) return res.status(404).send('Not found');
  link.clicks.push({
    referrer: req.get('referer') || 'direct',
    device: deviceFromUa(req.get('user-agent')),
    country: req.get('x-geo-country') || 'unknown',
    ua: req.get('user-agent') || '',
  });
  await link.save();
  res.redirect(link.originalUrl);
}

export async function apiCreate(req, res) {
  const key = req.headers['x-api-key'];
  if (!key) return res.status(401).json({ message: 'API key required' });
  if (!rateLimit(key)) return res.status(429).json({ message: 'Rate limit exceeded' });
  const user = await User.findOne({ apiKey: key });
  if (!user) return res.status(401).json({ message: 'Invalid API key' });
  const slug = req.body.alias || nanoid(7);
  const link = await Link.create({
    user: user._id, originalUrl: req.body.originalUrl, slug, title: req.body.title, utm: req.body.utm,
  });
  res.status(201).json(link);
}

export default router;
