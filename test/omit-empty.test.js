const urlMetadata = require('./../index')

// Minimal page: title/lang/charset/author populated; most other fields absent
// (seed to empty string) so we can assert `omitEmpty` drops them. Uses
// `parseResponseObject` so there's no network — same pattern as options.test.js.
const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Metadata page</title>
    <meta name="author" content="foobar">
  </head>
  <body>
    <h1>Metadata page</h1>
  </body>
</html>
`

function makeResponse () {
  return new Response(html, { headers: { 'Content-Type': 'text/html' } })
}

test('default (no omitEmpty): absent fields present as empty', async () => {
  const metadata = await urlMetadata(null, { parseResponseObject: makeResponse() })
  expect(metadata.redirects.chain.length).toBe(0)
  expect(metadata.performance.redirectTimeMs).toBeUndefined()
  expect(metadata.description).toBe('')
  expect(metadata.favicons.length).toBe(0) // empty []
  expect(metadata['og:title']).toBe('')
  expect(metadata.keywords).toBe('')
  expect(metadata.jsonld.length).toBe(0) // empty []
})

test('omitEmpty option: drops undefined, null, empty string, [], and {}', async () => {
  const metadata = await urlMetadata(null, {
    parseResponseObject: makeResponse(),
    omitEmpty: true
  })
  expect('description' in metadata).toBe(false)
  expect('favicons' in metadata).toBe(false)
  expect('og:title' in metadata).toBe(false)
  expect('keywords' in metadata).toBe(false)
  expect('jsonld' in metadata).toBe(false)
  expect('responseBody' in metadata).toBe(false) // '' when includeResponseBody false, the default
  expect('url' in metadata).toBe(false) // '' in parseResponseObject mode (no fetch)
})

test('omitEmpty: retains populated fields', async () => {
  const metadata = await urlMetadata(null, {
    parseResponseObject: makeResponse(),
    omitEmpty: true
  })
  expect(metadata.title).toBe('Metadata page')
  expect(metadata.lang).toBe('en')
  expect(metadata.charset).toBe('utf-8')
  expect(metadata.author).toBe('foobar')
  expect(metadata.responseStatusCode).toBe(200)
  expect(metadata.headings.length).toBe(1)
})

test('omitEmpty is shallow: strips empty, keeps populated & keyed', async () => {
  const metadata = await urlMetadata(null, {
    parseResponseObject: makeResponse(),
    omitEmpty: true
  })
  // empty arrays stripped
  expect('favicons' in metadata).toBe(false) // []
  expect('jsonld' in metadata).toBe(false) // []
  // null stripped (requestUrl is null in parseResponseObject mode)
  expect('requestUrl' in metadata).toBe(false)
  // populated arrays survive (page has one <h1>)
  expect(metadata.headings.length).toBe(1)
  // nested objects with own keys are retained whole & NOT recursed into,
  // so performance keeps its (undefined-valued) inner keys
  expect('redirects' in metadata).toBe(true)
  expect(metadata.redirects.chain.length).toBe(0)
  expect('performance' in metadata).toBe(true)
  expect(metadata.performance).toHaveProperty('responseTimeMs')
  expect(metadata.performance.redirectTimeMs).toBeUndefined()
})
