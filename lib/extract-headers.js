const INCLUDED_HEADERS = new Set([

  // Indexability
  'x-robots-tag',
  'content-disposition', // 'attachment' = not indexable

  // Content
  'content-type', // character encoding
  'content-language',
  'content-encoding', // gzip, deflate, br
  'transfer-encoding', // chunked, common for dynamic content
  'content-length',
  'content-location',
  'link',
  'accept-ranges',
  'content-range',
  'vary',

  // Caching/ freshness
  'date',
  'age', // time in seconds the page was in a proxy cache
  'last-modified',
  'expires',
  'cache-control',
  'x-cache-status', // nginx
  'x-cache', // CDNs: Fastly, Varnish, Amzn Cloudfront
  'cf-cache-status', // Cloudflare
  'etag',
  'refresh',
  'retry-after', // tells the caller when to come back (429s)

  // Security
  'strict-transport-security', // HSTS - force https
  'content-security-policy', // CSP
  'x-content-type-options', // nosniff directive
  'x-frame-options', // prevent clickjacking
  'referrer-policy', // privacy
  'permissions-policy', // gates browser features (camera, mic, geolocation…); successor to feature-policy
  // COOP & COEP: these two work as a pair, new, correct values are moving targets:
  'cross-origin-opener-policy', // COOP: isolates window from cross-origin openers (window.opener attacks)
  'cross-origin-embedder-policy', // COEP: requires embedded resources to opt in (CORP/CORS) before loading
  // usually more for resources (like images) not html pages, detect anyway:
  'cross-origin-resource-policy', // CORP: set on a resource to declare who may embed it (same-origin/same-site/cross-origin)
  'x-xss-protection', // deprecated but detect anyway

  // Server info
  'server',
  'server-timing', // perf metrics

  // Useful custom headers
  'x-powered-by',
  'x-page-speed', // deprecated

  // Proxy response headers - ScraperAPI.com
  'sa-credit-cost',
  'sa-screenshot'
])

module.exports = function serializeHeaders (headers) {
  const serialized = {}

  headers.forEach((value, key) => {
    // Only include whitelisted headers
    if (INCLUDED_HEADERS.has(key.toLowerCase())) {
      serialized[key] = value
    }
  })

  return serialized
}
