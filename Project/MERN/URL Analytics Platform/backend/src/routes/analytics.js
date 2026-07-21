import express from 'express';
import Link from '../models/Link.js';
import Click from '../models/Click.js';
import requireAuth from '../middleware/auth.js';

const router = express.Router();
router.use(requireAuth);

async function ownedLinkIds(userId) {
  const links = await Link.find({ owner: userId }).select('_id');
  return links.map((l) => l._id);
}

// Overview across all of the user's links: totals + top performing links
router.get('/overview', async (req, res, next) => {
  try {
    const linkIds = await ownedLinkIds(req.user.id);
    const totalClicks = await Click.countDocuments({ link: { $in: linkIds } });
    const totalLinks = linkIds.length;

    const topLinks = await Link.find({ owner: req.user.id })
      .sort({ clicksCount: -1 })
      .limit(5)
      .select('title slug clicksCount originalUrl');

    const last7 = await Click.aggregate([
      { $match: { link: { $in: linkIds }, createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.json({ totalClicks, totalLinks, topLinks, last7 });
  } catch (err) {
    next(err);
  }
});

async function assertOwnership(userId, linkId) {
  const link = await Link.findOne({ _id: linkId, owner: userId });
  if (!link) throw Object.assign(new Error('Link not found'), { status: 404 });
  return link;
}

// Clicks-per-day time series for one link (last 30 days), used to draw the line chart
router.get('/:linkId/summary', async (req, res, next) => {
  try {
    const link = await assertOwnership(req.user.id, req.params.linkId);

    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const byDay = await Click.aggregate([
      { $match: { link: link._id, createdAt: { $gte: since } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    const uniqueIps = await Click.distinct('ip', { link: link._id });

    res.json({
      totalClicks: link.clicksCount,
      uniqueVisitors: uniqueIps.length,
      byDay,
    });
  } catch (err) {
    if (err.status) return res.status(err.status).json({ message: err.message });
    next(err);
  }
});

// Breakdown by device / browser / OS / referrer / country for pie & bar charts
router.get('/:linkId/breakdown', async (req, res, next) => {
  try {
    const link = await assertOwnership(req.user.id, req.params.linkId);
    const linkId = link._id;

    const groupBy = async (field) =>
      Click.aggregate([
        { $match: { link: linkId } },
        { $group: { _id: `$${field}`, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]);

    const [devices, browsers, os, referrers, countries] = await Promise.all([
      groupBy('device'),
      groupBy('browser'),
      groupBy('os'),
      groupBy('referrer'),
      groupBy('country'),
    ]);

    res.json({ devices, browsers, os, referrers, countries });
  } catch (err) {
    if (err.status) return res.status(err.status).json({ message: err.message });
    next(err);
  }
});

export default router;
