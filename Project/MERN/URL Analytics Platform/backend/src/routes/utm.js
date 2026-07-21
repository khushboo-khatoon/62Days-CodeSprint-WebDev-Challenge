import express from 'express';
import { buildUtmUrl } from '../utils/utm.js';

const router = express.Router();

// Pure utility endpoint (no auth needed): given a base URL and UTM fields,
// returns the fully-built campaign URL. Handy for the frontend's "UTM Builder" tab.
router.post('/build', (req, res) => {
  const { baseUrl, source, medium, campaign, term, content } = req.body;

  if (!baseUrl) return res.status(400).json({ message: 'baseUrl is required' });

  try {
    const url = buildUtmUrl(baseUrl, { source, medium, campaign, term, content });
    res.json({ url });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
