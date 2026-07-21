import { Router } from 'express';
import ServiceRoute from '../models/ServiceRoute.js';
import { protect } from '../middleware/auth.js';

const router = Router();
router.use(protect);

router.get('/', async (req, res, next) => {
  try {
    const routes = await ServiceRoute.find().sort({ pathPrefix: 1 }).populate('createdBy', 'name email');
    res.json(routes);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, pathPrefix, method, targetType, targetUrl, mockResponse, latencyMs, policy } = req.body;
    if (!name || !pathPrefix) {
      return res.status(400).json({ message: 'name and pathPrefix are required' });
    }
    const route = await ServiceRoute.create({
      createdBy: req.user._id,
      name,
      pathPrefix: pathPrefix.startsWith('/') ? pathPrefix : `/${pathPrefix}`,
      method: method || 'ANY',
      targetType: targetType || 'mock',
      targetUrl,
      mockResponse,
      latencyMs,
      policy,
    });
    res.status(201).json(route);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'A route with that path prefix and method already exists' });
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const route = await ServiceRoute.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json(route);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const route = await ServiceRoute.findByIdAndDelete(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json({ message: 'Route deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
