import ApiKey from '../models/ApiKey.js';

// In-memory token-bucket style rate limiter, keyed by API key id.
// Educational implementation only: resets per-process, not shared across instances.
const buckets = new Map();

function isRateLimited(keyId, requestsPerMinute) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const bucket = buckets.get(keyId) || { count: 0, windowStart: now };

  if (now - bucket.windowStart > windowMs) {
    bucket.count = 0;
    bucket.windowStart = now;
  }

  bucket.count += 1;
  buckets.set(keyId, bucket);

  return bucket.count > requestsPerMinute;
}

// Authenticates requests made with an "x-api-key" header instead of a JWT.
// Used by the public API (e.g. programmatic link creation) and applies simple rate limiting.
export default async function apiKeyAuth(req, res, next) {
  const key = req.headers['x-api-key'];
  if (!key) {
    return res.status(401).json({ message: 'Missing x-api-key header' });
  }

  try {
    const apiKey = await ApiKey.findOne({ key, isActive: true });
    if (!apiKey) {
      return res.status(401).json({ message: 'Invalid API key' });
    }

    if (isRateLimited(String(apiKey._id), apiKey.requestsPerMinute)) {
      return res.status(429).json({ message: 'Rate limit exceeded for this API key. Try again shortly.' });
    }

    apiKey.lastUsedAt = new Date();
    await apiKey.save();

    req.apiKeyOwnerId = apiKey.owner;
    next();
  } catch (err) {
    next(err);
  }
}
