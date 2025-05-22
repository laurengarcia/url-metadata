const INCLUDED_HEADERS = new Set([
  // Content metadata
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
  'last-modified',
  'expires',
  'cache-control',
  'etag',
  'refresh',

  // Server info
  'server',

  // Useful custom headers
  'x-powered-by',
  'x-cache-status',
  'x-page-speed'
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
