// Builds a full URL with UTM query parameters appended, skipping empty values.
export function buildUtmUrl(baseUrl, utm = {}) {
  let url;
  try {
    url = new URL(baseUrl);
  } catch (err) {
    throw new Error('Invalid base URL');
  }

  const mapping = {
    source: 'utm_source',
    medium: 'utm_medium',
    campaign: 'utm_campaign',
    term: 'utm_term',
    content: 'utm_content',
  };

  Object.entries(mapping).forEach(([key, param]) => {
    const value = utm[key];
    if (value) url.searchParams.set(param, value);
  });

  return url.toString();
}
