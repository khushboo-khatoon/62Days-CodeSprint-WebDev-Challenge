// Minimal, educational User-Agent parser. Good enough to bucket clicks by
// device/browser/OS for charts without pulling in a heavy dependency.

export function parseUserAgent(uaString = '') {
  const ua = uaString || '';

  let device = 'desktop';
  if (/tablet|ipad/i.test(ua)) device = 'tablet';
  else if (/mobile|iphone|android/i.test(ua)) device = 'mobile';

  let browser = 'Unknown';
  if (/edg\//i.test(ua)) browser = 'Edge';
  else if (/chrome\//i.test(ua) && !/chromium/i.test(ua)) browser = 'Chrome';
  else if (/firefox\//i.test(ua)) browser = 'Firefox';
  else if (/safari\//i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
  else if (/opr\/|opera/i.test(ua)) browser = 'Opera';

  let os = 'Unknown';
  if (/windows/i.test(ua)) os = 'Windows';
  else if (/mac os x/i.test(ua)) os = 'macOS';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ios/i.test(ua)) os = 'iOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  return { device, browser, os };
}
