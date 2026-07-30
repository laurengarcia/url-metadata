const urlMetadata = require('../index')
const MetadataFields = require('../lib/metadata-fields')
const { selectFields, NON_META_KEYS } = require('../lib/resolve-fields')

// -- selectFields unit test (pure) --

const full = {
  requestUrl: 'https://x.test',
  url: 'https://x.test',
  title: 'T',
  description: 'D',
  charset: 'utf-8',
  'og:title': 'OT',
  'og:url': '',
  'twitter:card': 'summary',
  'dc.creator': 'Jane', // arbitrary meta tag
  favicons: [],
  redirects: {},
  responseStatusCode: 200
}

test('selectFields: atomic keys', () => {
  const r = selectFields(full, ['title', 'description'])
  expect(Object.keys(r).sort()).toEqual(['description', 'title'])
})

test('selectFields: og prefix keeps empty whitelisted og keys (orthogonal to omitEmpty)', () => {
  const r = selectFields(full, ['og'])
  expect(Object.keys(r).sort()).toEqual(['og:title', 'og:url'])
  expect(r['og:url']).toBe('')
})

test('selectFields: twitter prefix', () => {
  const r = selectFields(full, ['twitter'])
  expect(Object.keys(r)).toEqual(['twitter:card'])
})

test('selectFields: meta includes arbitrary + charset, excludes structural', () => {
  const r = selectFields(full, ['meta'])
  expect('description' in r).toBe(true)
  expect('charset' in r).toBe(true)
  expect('dc.creator' in r).toBe(true)
  expect('og:title' in r).toBe(true)
  expect('twitter:card' in r).toBe(true)
  // structural keys excluded
  expect('title' in r).toBe(false)
  expect('url' in r).toBe(false)
  expect('favicons' in r).toBe(false)
  expect('responseStatusCode' in r).toBe(false)
})

test('selectFields: meta:<name> selects one literal key', () => {
  expect(Object.keys(selectFields(full, ['meta:dc.creator']))).toEqual(['dc.creator'])
})

test('selectFields: meta:<name> for an absent tag yields nothing', () => {
  expect(Object.keys(selectFields(full, ['meta:not-present']))).toEqual([])
})

test('selectFields: mixed atomic + group union', () => {
  expect(Object.keys(selectFields(full, ['title', 'twitter'])).sort())
    .toEqual(['title', 'twitter:card'])
})

test('selectFields: result preserves source object order, not request order', () => {
  expect(Object.keys(selectFields(full, ['description', 'title']))).toEqual(['title', 'description'])
})

test('NON_META_KEYS are all real seed keys (drift canary)', () => {
  const seed = new MetadataFields({}).fields
  NON_META_KEYS.forEach((k) => expect(k in seed).toBe(true))
})

// -- integration test via parseResponseObject (no network) --

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Test Page</title>
  <meta name="description" content="A description">
  <meta name="dc.creator" content="Jane Doe">
  <meta property="og:title" content="OG Title">
  <meta property="og:image" content="https://x.test/img.png">
  <meta name="twitter:card" content="summary">
  <link rel="canonical" href="https://x.test/canonical">
</head>
<body><h1>Hi</h1></body>
</html>`

function res () {
  return new Response(html, { headers: { 'Content-Type': 'text/html' } })
}

test('fields og (integration): only og keys, empties kept', async () => {
  const m = await urlMetadata(null, { parseResponseObject: res(), fields: ['og'] })
  expect(m['og:title']).toBe('OG Title')
  expect(m['og:image']).toBe('https://x.test/img.png')
  expect(m['og:url']).toBe('') // empty whitelisted og key kept
  expect('twitter:card' in m).toBe(false)
  expect('title' in m).toBe(false)
})

test('fields og + omitEmpty (integration): only filled og keys', async () => {
  const m = await urlMetadata(null, { parseResponseObject: res(), fields: ['og'], omitEmpty: true })
  expect(m['og:title']).toBe('OG Title')
  expect('og:url' in m).toBe(false) // empty stripped by omitEmpty
})

test('fields twitter (integration): only twitter keys, empties kept', async () => {
  const m = await urlMetadata(null, { parseResponseObject: res(), fields: ['twitter'] })
  expect(m['twitter:card']).toBe('summary')
  expect(m['twitter:title']).toBe('') // empty whitelisted twitter key kept
  expect('twitter:url' in m).toBe(true) // present-but-empty
  expect('og:title' in m).toBe(false)
  expect('description' in m).toBe(false)
  expect('title' in m).toBe(false)
})

test('fields meta (integration): meta tags incl arbitrary + charset, no structural', async () => {
  const m = await urlMetadata(null, { parseResponseObject: res(), fields: ['meta'] })
  expect(m.description).toBe('A description')
  expect(m['dc.creator']).toBe('Jane Doe') // arbitrary
  expect(m['og:title']).toBe('OG Title')
  expect(m['twitter:card']).toBe('summary')
  expect(m.charset).toBe('utf-8') // charset is meta (documents the decision)
  expect('title' in m).toBe(false)
  expect('canonical' in m).toBe(false)
  expect('url' in m).toBe(false)
  expect('favicons' in m).toBe(false)
})

test('fields meta:<name> (integration): arbitrary tag escape hatch', async () => {
  const m = await urlMetadata(null, { parseResponseObject: res(), fields: ['meta:dc.creator'] })
  expect(Object.keys(m)).toEqual(['dc.creator'])
  expect(m['dc.creator']).toBe('Jane Doe')
})

test('fields atomic (integration): only requested keys', async () => {
  const m = await urlMetadata(null, { parseResponseObject: res(), fields: ['title', 'description'] })
  expect(Object.keys(m).sort()).toEqual(['description', 'title'])
})

test('fields atomic network field allowed in parseResponseObject mode', async () => {
  const m = await urlMetadata(null, { parseResponseObject: res(), fields: ['responseStatusCode'] })
  expect(Object.keys(m)).toEqual(['responseStatusCode'])
  expect(m.responseStatusCode).toBe(200)
})

// -- integration test w network for sanity check --

test('fields test w network call', async () => {
  const url = 'https://minifetch.com'
  const m = await urlMetadata(url, {
    fields: ['network', 'meta']
  })
  // fields: ['network']
  expect(m.redirects).toBeDefined()
  expect(m.responseHeaders).toBeDefined()
  expect(m.responseStatusCode).toBeDefined()
  expect(m.performance).toBeDefined()
  // fields: ['meta']
  expect(m.charset).toBeDefined()
  expect(m.description).toBeDefined()
  expect(m['og:url']).toBeDefined()
  expect(m['twitter:title']).toBeDefined()
  // `fields: ['meta']` returns arbitrary meta tags
  // not listed in lib/metadata-fields.js
  expect(m['apple-mobile-web-app-title']).toBe('Minifetch')
})
