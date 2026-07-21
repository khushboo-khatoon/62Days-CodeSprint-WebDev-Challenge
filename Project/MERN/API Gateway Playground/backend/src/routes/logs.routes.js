import { Router } from 'express';
import RequestLog from '../models/RequestLog.js';
import { protect } from '../middleware/auth.js';

const router = Router();
router.use(protect);

router.get('/', async (req, res, next) => {
  try {
    const { method, policyOutcome, route, statusCode, q, from, to, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (method) filter.method = method;
    if (policyOutcome) filter.policyOutcome = policyOutcome;
    if (route) filter.matchedRoute = route;
    if (statusCode) filter.statusCode = Number(statusCode);
    if (q) filter.path = { $regex: q, $options: 'i' };
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(200, Math.max(1, parseInt(limit, 10) || 50));

    const [items, total] = await Promise.all([
      RequestLog.find(filter)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .populate('matchedRoute', 'name pathPrefix'),
      RequestLog.countDocuments(filter),
    ]);

    res.json({ items, total, page: pageNum, pages: Math.ceil(total / limitNum) });
  } catch (err) {
    next(err);
  }
});

router.get('/stats', async (req, res, next) => {
  try {
    const byOutcome = await RequestLog.aggregate([
      { $group: { _id: '$policyOutcome', count: { $sum: 1 } } },
    ]);
    const byStatus = await RequestLog.aggregate([
      { $group: { _id: '$statusCode', count: { $sum: 1 } } },
    ]);
    const avgLatency = await RequestLog.aggregate([
      { $group: { _id: null, avg: { $avg: '$latencyMs' } } },
    ]);
    res.json({
      byOutcome,
      byStatus,
      avgLatencyMs: avgLatency[0]?.avg || 0,
      total: await RequestLog.countDocuments(),
    });
  } catch (err) {
    next(err);
  }
});

export default router;
