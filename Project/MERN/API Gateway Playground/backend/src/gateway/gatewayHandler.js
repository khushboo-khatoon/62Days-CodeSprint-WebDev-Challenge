import jwt from 'jsonwebtoken';
import ServiceRoute from '../models/ServiceRoute.js';
import ApiKey from '../models/ApiKey.js';
import RequestLog from '../models/RequestLog.js';
import { checkRateLimit } from './rateLimiter.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function findMatchingRoute(path, method) {
  const routes = await ServiceRoute.find({ active: true });
  const candidates = routes.filter(
    (r) =>
      (path === r.pathPrefix || path.startsWith(`${r.pathPrefix}/`)) &&
      (r.method === 'ANY' || r.method === method)
  );
  if (candidates.length === 0) return null;
  // Longest prefix wins, same idea as most real reverse proxies / gateways.
  candidates.sort((a, b) => b.pathPrefix.length - a.pathPrefix.length);
  return candidates[0];
}

async function logRequest(fields) {
  try {
    await RequestLog.create(fields);
  } catch (err) {
    console.error('Failed to write request log:', err.message);
  }
}

export async function gatewayHandler(req, res) {
  const start = Date.now();
  const path = req.path.replace(/^\/gateway/, '') || '/';
  const method = req.method;
  const ip = req.ip || req.socket?.remoteAddress || 'unknown';

  const finish = async ({ statusCode, policyOutcome, body, headers, route, apiKeyUsed, userSubject, error }) => {
    const latencyMs = Date.now() - start;
    res.status(statusCode);
    if (headers) Object.entries(headers).forEach(([k, v]) => res.set(k, v));
    res.set('X-Gateway-Latency-Ms', String(latencyMs));
    res.set('X-Gateway-Policy-Outcome', policyOutcome);
    if (body !== undefined) res.json(body);
    else res.end();

    await logRequest({
      method,
      path,
      matchedRoute: route?._id || null,
      routeName: route?.name || null,
      statusCode,
      latencyMs,
      policyOutcome,
      apiKeyUsed: apiKeyUsed || null,
      userSubject: userSubject || null,
      ip,
      error: error || null,
    });
  };

  const route = await findMatchingRoute(path, method);
  if (!route) {
    return finish({
      statusCode: 404,
      policyOutcome: 'not_found',
      body: { message: `No route configured for ${method} ${path}` },
    });
  }

  let userSubject = null;
  let apiKeyUsed = null;

  if (route.policy.requireJwt) {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
      return finish({ statusCode: 401, policyOutcome: 'unauthorized', route, body: { message: 'Missing bearer token' } });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userSubject = decoded.id;
    } catch {
      return finish({ statusCode: 401, policyOutcome: 'unauthorized', route, body: { message: 'Invalid or expired token' } });
    }
  }

  if (route.policy.requireApiKey) {
    const key = req.headers['x-api-key'];
    if (!key) {
      return finish({ statusCode: 401, policyOutcome: 'unauthorized', route, body: { message: 'Missing x-api-key header' } });
    }
    const apiKeyDoc = await ApiKey.findOne({ key });
    if (!apiKeyDoc || !apiKeyDoc.active) {
      return finish({ statusCode: 403, policyOutcome: 'forbidden_api_key', route, body: { message: 'Invalid or inactive API key' } });
    }
    apiKeyUsed = key;
  }

  if (route.policy.rateLimit?.enabled) {
    const identifier = apiKeyUsed || ip;
    const result = checkRateLimit(`${route._id}:${identifier}`, route.policy.rateLimit.windowMs, route.policy.rateLimit.max);
    if (!result.allowed) {
      return finish({
        statusCode: 429,
        policyOutcome: 'rate_limited',
        route,
        apiKeyUsed,
        userSubject,
        headers: { 'Retry-After': Math.ceil(result.retryAfterMs / 1000) },
        body: { message: 'Rate limit exceeded for this route', retryAfterMs: result.retryAfterMs },
      });
    }
  }

  if (route.latencyMs > 0) {
    await sleep(route.latencyMs);
  }

  if (route.targetType === 'proxy' && route.targetUrl) {
    try {
      const upstreamUrl = route.targetUrl.replace(/\/$/, '') + path.replace(route.pathPrefix, '');
      const upstreamRes = await fetch(upstreamUrl, {
        method,
        headers: { 'content-type': 'application/json' },
        body: ['GET', 'HEAD'].includes(method) ? undefined : JSON.stringify(req.body || {}),
      });
      const contentType = upstreamRes.headers.get('content-type') || '';
      const body = contentType.includes('application/json') ? await upstreamRes.json() : await upstreamRes.text();
      return finish({ statusCode: upstreamRes.status, policyOutcome: 'allowed', route, apiKeyUsed, userSubject, body });
    } catch (err) {
      return finish({
        statusCode: 502,
        policyOutcome: 'upstream_error',
        route,
        apiKeyUsed,
        userSubject,
        error: err.message,
        body: { message: 'Upstream request failed', detail: err.message },
      });
    }
  }

  return finish({
    statusCode: route.mockResponse.status || 200,
    policyOutcome: 'allowed',
    route,
    apiKeyUsed,
    userSubject,
    body: route.mockResponse.body,
  });
}
