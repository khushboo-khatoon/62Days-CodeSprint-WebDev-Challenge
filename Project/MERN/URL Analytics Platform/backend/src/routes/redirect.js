import express from 'express';
import Link from '../models/Link.js';
import Click from '../models/Click.js';
import { extractClientIp, lookupGeo } from '../utils/geo.js';
import { parseUserAgent } from '../utils/ua.js';

const router = express.Router();

// Public redirect endpoint: GET /r/:slug
// Redirects to the destination URL immediately, then records the click in the background
// so analytics never slow down the user's navigation.
router.get('/:slug', async (req, res, next) => {
  try {
    const link = await Link.findOne({ slug: req.params.slug, isActive: true });
    if (!link) return res.status(404).send('Short link not found');

    res.redirect(302, link.finalUrl);

    // Fire-and-forget click tracking
    trackClick(req, link).catch((err) => console.error('Click tracking failed:', err.message));
  } catch (err) {
    next(err);
  }
});

async function trackClick(req, link) {
  const { device, browser, os } = parseUserAgent(req.headers['user-agent']);
  const ip = extractClientIp(req);
  const geo = await lookupGeo(ip);

  await Click.create({
    link: link._id,
    ip,
    country: geo.country,
    city: geo.city,
    device,
    browser,
    os,
    referrer: req.headers.referer || req.headers.referrer || 'Direct',
  });

  await Link.updateOne({ _id: link._id }, { $inc: { clicksCount: 1 } });
}

export default router;
