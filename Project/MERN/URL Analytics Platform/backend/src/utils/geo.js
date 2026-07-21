// Resolves a rough geo location for an IP address using a free API (ip-api.com).
// Falls back gracefully to "Unknown" when offline, rate limited, or given a private/local IP,
// which is the common case in local development.

const PRIVATE_IP_PATTERN = /^(127\.|10\.|192\.168\.|::1|localhost|172\.(1[6-9]|2\d|3[0-1])\.)/;

export async function lookupGeo(ip) {
  const fallback = { country: 'Unknown', city: 'Unknown' };

  if (!ip || PRIVATE_IP_PATTERN.test(ip)) {
    return fallback;
  }

  const apiUrl = process.env.GEO_API_URL || 'http://ip-api.com/json';

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const response = await fetch(`${apiUrl}/${ip}?fields=status,country,city`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) return fallback;

    const data = await response.json();
    if (data.status !== 'success') return fallback;

    return {
      country: data.country || 'Unknown',
      city: data.city || 'Unknown',
    };
  } catch (err) {
    return fallback;
  }
}

export function extractClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || req.ip || 'unknown';
}
