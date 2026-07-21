import { Router } from 'express';
import ApiKey from '../models/ApiKey.js';
import { protect } from '../middleware/auth.js';

const router = Router();
router.use(protect);

router.get('/', async (req, res, next) => {
  try {
    const keys = await ApiKey.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.json(keys);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { label, rateLimit } = req.body;
    if (!label) return res.status(400).json({ message: 'label is required' });
    const key = await ApiKey.create({ owner: req.user._id, label, rateLimit });
    res.status(201).json(key);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const key = await ApiKey.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!key) return res.status(404).json({ message: 'API key not found' });
    res.json(key);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const key = await ApiKey.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!key) return res.status(404).json({ message: 'API key not found' });
    res.json({ message: 'API key deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
