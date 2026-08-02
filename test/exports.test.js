const urlMetadata = require('../index')
const browserEntry = require('../browser')
const resolveFieldsModule = require('../lib/resolve-fields')

// The result-shaping trio (resolveFields, selectFields, isEmpty) is exposed on
// the public entry (5.10.0) so consumers can filter an already-parsed result
// without re-fetching. These tests assert the surface exists, is the SAME
// reference as the internal single source of truth (guards against a divergent
// copy drifting), is mirrored on the browser entry, and behaves.

test('index exposes the result-shaping trio as functions', () => {
  expect(typeof urlMetadata.resolveFields).toBe('function')
  expect(typeof urlMetadata.selectFields).toBe('function')
  expect(typeof urlMetadata.isEmpty).toBe('function')
})

test('exposed helpers are the internal ones (single source of truth, no copy)', () => {
  expect(urlMetadata.resolveFields).toBe(resolveFieldsModule)
  expect(urlMetadata.selectFields).toBe(resolveFieldsModule.selectFields)
  expect(urlMetadata.isEmpty).toBe(resolveFieldsModule.isEmpty)
})

test('browser entry mirrors the same trio (same refs, no drift between entries)', () => {
  expect(browserEntry.resolveFields).toBe(urlMetadata.resolveFields)
  expect(browserEntry.selectFields).toBe(urlMetadata.selectFields)
  expect(browserEntry.isEmpty).toBe(urlMetadata.isEmpty)
})

test('selectFields projects a full object to the selection (groups expand, empties kept)', () => {
  const full = {
    title: 'x',
    description: 'd',
    'og:url': 'y',
    'og:title': '', // empty, but selection is orthogonal to omitEmpty -> kept
    'twitter:card': 'summary',
    redirects: {}
  }
  // og group -> every key starting 'og:'; description/twitter/redirects dropped
  expect(urlMetadata.selectFields(full, ['title', 'og'])).toEqual({
    title: 'x',
    'og:url': 'y',
    'og:title': ''
  })
})

test('selectFields: meta:<name> selects a page-specific key literally (colons kept)', () => {
  const full = { title: 'x', 'al:ios:url': 'app://z' }
  expect(urlMetadata.selectFields(full, ['meta:al:ios:url'])).toEqual({ 'al:ios:url': 'app://z' })
})

test('selectFields: only keys present in the object are returned', () => {
  // meta:<name> for a tag the page lacks is simply absent (not undefined-valued)
  const full = { title: 'x' }
  expect(urlMetadata.selectFields(full, ['meta:dc.creator'])).toEqual({})
})

test('isEmpty is the omitEmpty predicate (undefined, null, "", [], {})', () => {
  const empties = [undefined, null, '', [], {}]
  const nonEmpties = ['x', 0, false, ['a'], { a: 1 }]
  empties.forEach(v => expect(urlMetadata.isEmpty(v)).toBe(true))
  nonEmpties.forEach(v => expect(urlMetadata.isEmpty(v)).toBe(false))
})

test('resolveFields on the public entry validates (undefined -> null, unknown -> throw)', () => {
  expect(urlMetadata.resolveFields(undefined)).toBe(null)
  expect(() => urlMetadata.resolveFields(['nope'])).toThrow('unknown')
})
