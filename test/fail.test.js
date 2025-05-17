const urlMetadata = require('./../index')

test('fails gracefully with malformed url param', async () => {
  const url = 'XYZ'
  try {
    const metadata = await urlMetadata(url)
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('Only absolute URLs are supported')
  }
})

test('fails gracefully when url param is missing', async () => {
  try {
    const metadata = await urlMetadata(null)
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('url parameter is missing')
  }
})

test('fails gracefully on !response.ok', async () => {
  // should 404
  const url = 'https://www.npmjs.com/packageXXX/url-metadataXXX'
  try {
    const metadata = await urlMetadata(url)
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('response code 404')
  }
})

test('fails gracefully when fetching non text/html', async () => {
  const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/500px-International_Pok%C3%A9mon_logo.svg.png'
  try {
    const metadata = await urlMetadata(url)
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('unsupported content type')
  }
})

test('fails gracefully decoding with bad charset', async () => {
  const url = 'https://www.npmjs.com/package/url-metadata'
  try {
    const metadata = await urlMetadata(url, { decode: 'FOO-BAR' })
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('decoding with charset')
  }
})

test('fails gracefully when option `parseResponseObject` is empty object', async () => {
  try {
    // pass null `url` param & empty response object
    const metadata = await urlMetadata(null, { parseResponseObject: {} })
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('response code undefined')
  }
})

test('fails gracefully when option: `parseResponseObject` is null AND url is null', async () => {
  try {
    const metadata = await urlMetadata(null, { parseResponseObject: null })
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('url parameter is missing')
  }
})
