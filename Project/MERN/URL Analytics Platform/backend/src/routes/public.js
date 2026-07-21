import express from 'express';
import apiKeyAuth from '../middleware/apiKeyAuth.js';
import { createLinkForOwner } from './links.js';

const router = express.Router();

// Programmatic API for creating short links using an API key (x-api-key header)
// instead of a JWT. Protected by the in-memory rate limiter in apiKeyAuth.
router.post('/links', apiKeyAuth, async (req, res, next) => {
  try {
    const link = await createLinkForOwner(req.apiKeyOwnerId, req.body);
    res.status(201).json({ link });
  } catch (err) {
    if (err.status) return res.status(err.status).json({ message: err.message });
    next(err);
  }
});

export default router;
