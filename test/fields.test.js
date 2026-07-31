const resolveFields = require('../lib/resolve-fields')
const urlMetadata = require('../index')

// Step 1: `fields` default + eager validation only. Group expansion and
// extraction gating land in later steps. These tests assert validation
// behavior, not return shape (which becomes an expanded Set later), so valid
// inputs are checked with `not.toThrow()` rather than deep equality.
// Note: .toThrow('<msg>') checks that <msg> is substring of the error msg.

test('fields: undefined returns null (full result, no filtering)', () => {
  expect(resolveFields(undefined)).toBe(null)
})

test('fields: valid atomic keys pass validation', () => {
  expect(() => resolveFields(['title', 'description'])).not.toThrow()
})

test('fields: valid group names pass validation', () => {
  expect(() => resolveFields(['network', 'og', 'twitter', 'meta'])).not.toThrow()
})

test('fields: mix of atomic keys and group names passes', () => {
  expect(() => resolveFields(['title', 'og', 'favicons'])).not.toThrow()
})

test('fields: empty array throws', () => {
  expect(() => resolveFields([])).toThrow('empty array')
})

test('fields: unknown token throws (names the token)', () => {
  expect(() => resolveFields(['titel'])).toThrow("unknown `fields` token: 'titel'")
})

test('fields: non-array throws', () => {
  expect(() => resolveFields('title')).toThrow('must be an array')
})

test('fields: non-string token throws', () => {
  expect(() => resolveFields(['title', 42])).toThrow('must be strings')
})

test('fields: bare `og`/`twitter` are groups, not atomic keys — still valid', () => {
  // sanity: these resolve as group names even though bare `og` is not a key
  expect(() => resolveFields(['og'])).not.toThrow()
})

test('fields: `meta:<name>` escape hatch passes for a page-specific tag', () => {
  expect(() => resolveFields(['meta:dc.creator'])).not.toThrow()
})

test('fields: `meta:<name>` keeps colons in the tag name (no split)', () => {
  expect(() => resolveFields(['meta:al:ios:url'])).not.toThrow()
})

test('fields: `meta:<name>` allows a redundant known suffix (meta:og:title)', () => {
  expect(() => resolveFields(['meta:og:title'])).not.toThrow()
})

test('fields: bare `meta:` with no tag name throws', () => {
  expect(() => resolveFields(['meta:'])).toThrow('missing a tag name')
})

test('fields: unknown bare token error teaches the `meta:` hatch', () => {
  expect(() => resolveFields(['dc.creator'])).toThrow("prefix with 'meta:'")
})

test('fields: validates eagerly through urlMetadata, before any fetch', () => {
  // throw is synchronous (like the proxyParams guard), so no network is hit
  expect(() => urlMetadata('https://example.com', { fields: [] })).toThrow('empty array')
  expect(() => urlMetadata('https://example.com', { fields: ['nope'] })).toThrow('unknown')
})
