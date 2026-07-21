// Very small in-memory sliding-window rate limiter.
//
// Keyed by `${routeId}:${identifier}` (identifier = API key or IP), so each
// caller gets their own window per route. State is process-memory only -
// good enough for a single-instance educational playground, but would need
// a shared store (e.g. Redis) across multiple gateway instances in real life.
const hits = new Map();

export function checkRateLimit(key, windowMs, max) {
  const now = Date.now();
  const timestamps = (hits.get(key) || []).filter((t) => now - t < windowMs);

  if (timestamps.length >= max) {
    hits.set(key, timestamps);
    const retryAfterMs = windowMs - (now - timestamps[0]);
    return { allowed: false, remaining: 0, retryAfterMs };
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return { allowed: true, remaining: max - timestamps.length, retryAfterMs: 0 };
}

export function resetRateLimiter() {
  hits.clear();
}
