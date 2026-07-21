import express from 'express';
import crypto from 'crypto';
import ApiKey from '../models/ApiKey.js';
import requireAuth from '../middleware/auth.js';

const router = express.Router();
router.use(requireAuth);

function maskKey(key) {
  return `${key.slice(0, 8)}${'*'.repeat(20)}${key.slice(-4)}`;
}

router.get('/', async (req, res, next) => {
  try {
    const keys = await ApiKey.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json({ keys: keys.map((k) => ({ ...k.toObject(), key: maskKey(k.key) })) });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { label, requestsPerMinute } = req.body;
    const key = `ua_${crypto.randomBytes(24).toString('hex')}`;

    const apiKey = await ApiKey.create({
      owner: req.user.id,
      key,
      label: label || 'API Key',
      requestsPerMinute: requestsPerMinute || 30,
    });

    // Return the full key only once, at creation time - like real API providers do
    res.status(201).json({ key: apiKey.toObject() });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await ApiKey.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'API key not found' });
    res.json({ message: 'API key revoked' });
  } catch (err) {
    next(err);
  }
});

export default router;
