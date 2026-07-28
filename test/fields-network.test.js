const parse = require('../lib/parse')
const { isHeaderOnly, expandHeaderSelection, hasNetworkGroup, NETWORK_FIELDS } = require('../lib/resolve-fields')
const urlMetadata = require('../index')

// -- resolve-fields network helpers (pure) --

test('isHeaderOnly: true for `network` group and network-field subsets', () => {
  expect(isHeaderOnly(['network'])).toBe(true)
  expect(isHeaderOnly(['responseStatusCode'])).toBe(true)
  expect(isHeaderOnly(['network', 'url'])).toBe(true)
  expect(isHeaderOnly(['responseStatusCode', 'redirects'])).toBe(true)
})

test('isHeaderOnly: false when any body-dependent field is present', () => {
  expect(isHeaderOnly(['network', 'title'])).toBe(false)
  expect(isHeaderOnly(['title'])).toBe(false)
  expect(isHeaderOnly(['og'])).toBe(false)
})

test('isHeaderOnly: false for null/undefined (no filtering)', () => {
  expect(isHeaderOnly(null)).toBe(false)
  expect(isHeaderOnly(undefined)).toBe(false)
})

test('expandHeaderSelection: `network` expands to all six transport fields', () => {
  const set = expandHeaderSelection(['network'])
  NETWORK_FIELDS.forEach((f) => expect(set.has(f)).toBe(true))
  expect(set.size).toBe(NETWORK_FIELDS.length)
})

test('expandHeaderSelection: atomic fields pass through as themselves', () => {
  const set = expandHeaderSelection(['responseStatusCode', 'redirects'])
  expect([...set].sort()).toEqual(['redirects', 'responseStatusCode'])
})

test('hasNetworkGroup: true only when the `network` token is present', () => {
  expect(hasNetworkGroup(['network'])).toBe(true)
  expect(hasNetworkGroup(['responseStatusCode'])).toBe(false)
  expect(hasNetworkGroup(null)).toBe(false)
})

// -- parse.headerOnly assembly (pure, no network) --

const redirects = { count: 0, chain: [] }
const perf = { redirectTimeMs: undefined, ttfbMs: 12, responseTimeMs: undefined }
const headers = new Headers({ 'content-type': 'application/pdf', etag: 'abc123' })

test('parse.headerOnly: returns exactly the requested network fields', () => {
  const requested = expandHeaderSelection(['network'])
  const result = parse.headerOnly(
    'https://x.test', redirects, perf, 'https://x.test/final',
    200, headers, requested, undefined, { includeResponseBody: false }
  )
  expect(Object.keys(result).sort()).toEqual(
    ['performance', 'redirects', 'requestUrl', 'responseHeaders', 'responseStatusCode', 'url']
  )
  expect(result.url).toBe('https://x.test/final')
  expect(result.responseStatusCode).toBe(200)
  // whitelisted headers come through; no body-derived fields present
  expect(result.responseHeaders['content-type']).toBe('application/pdf')
  expect('title' in result).toBe(false)
  expect('favicons' in result).toBe(false)
})

test('parse.headerOnly: atomic subset returns only those keys', () => {
  const requested = expandHeaderSelection(['responseStatusCode', 'redirects'])
  const result = parse.headerOnly(
    'https://x.test', redirects, perf, 'https://x.test',
    404, headers, requested, undefined, { includeResponseBody: false }
  )
  expect(Object.keys(result).sort()).toEqual(['redirects', 'responseStatusCode'])
  expect(result.responseStatusCode).toBe(404)
})

test('parse.headerOnly: includeResponseBody adds responseBody', () => {
  const requested = expandHeaderSelection(['network'])
  const result = parse.headerOnly(
    'https://x.test', redirects, perf, 'https://x.test',
    200, headers, requested, '<html></html>', { includeResponseBody: true }
  )
  expect(result.responseBody).toBe('<html></html>')
})

test('parse.headerOnly: omitEmpty drops empty fields (shallow)', () => {
  const requested = expandHeaderSelection(['network'])
  const result = parse.headerOnly(
    '', redirects, perf, '', // requestUrl & url empty
    200, headers, requested, undefined, { omitEmpty: true }
  )
  // empty strings dropped
  expect('requestUrl' in result).toBe(false)
  expect('url' in result).toBe(false)
  // keyed objects retained (omitEmpty is shallow), non-empty status kept
  expect('performance' in result).toBe(true)
  expect('redirects' in result).toBe(true)
  expect(result.responseStatusCode).toBe(200)
})

// -- guard + end-to-end --

test('fields: parseResponseObject + `network` group throws eagerly', () => {
  const response = new Response('<html></html>', { headers: { 'Content-Type': 'text/html' } })
  expect(() => urlMetadata(null, { parseResponseObject: response, fields: ['network'] }))
    .toThrow('parseResponseObject mode')
})

test('network mode (live): returns only transport fields, body never parsed', async () => {
  const metadata = await urlMetadata('https://example.com', { fields: ['network'] })
  expect(metadata.responseStatusCode).toBe(200)
  expect(metadata.url).toContain('example.com')
  // body-derived fields must be absent (body was never read or parsed)
  expect('title' in metadata).toBe(false)
  expect('favicons' in metadata).toBe(false)
  expect('jsonld' in metadata).toBe(false)
  // responseTimeMs stays undefined (body unread); ttfb still measured
  expect(metadata.performance.ttfbMs).toBeDefined()
  expect(metadata.performance.ttfbMs).toBeGreaterThan(0)
  expect(metadata.performance.responseTimeMs).toBe(undefined)
})
