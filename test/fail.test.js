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

test('fails gracefully on DNS errors', async () => {
  try {
    // note: url typo (missing "i"), DNS doesn't resolve!
    const url = 'https://minfetch.com'
    const metadata = await urlMetadata(url)
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err).toBeDefined()
    // This error thrown by `node-fetch` or native fetch
    expect(err.message).toContain('getaddrinfo ENOTFOUND')
    expect(err.type).toBe('system')
    // ENOTFOUND = Error: Not Found = DNS lookup error from `node-fetch`
    expect(err.errno).toBe('ENOTFOUND')
    expect(err.code).toBe('ENOTFOUND')
  }
})


test('fails gracefully on !response.ok', async () => {
  // should 403
  const url = 'https://www.npmjs.com/packageXXX/url-metadataXXX'
  try {
    const metadata = await urlMetadata(url)
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('response code 403')
    expect(err.statusCode).toBe(403)
  }
})

test('fails gracefully on 404', async () => {
  try {
    const url = 'https://nichenetworks.io/foo'
    const metadata = await urlMetadata(url)
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('404')
    expect(err.statusCode).toBe(404)
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
    expect(err.statusCode).toBe(200)
  }
})

test('fails gracefully fetching .txt file', async () => {
  const url = 'https://anthropic.com/robots.txt'
  try {
    const metadata = await urlMetadata(url)
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('unsupported content type')
    expect(err.statusCode).toBe(200)
  }
})

test('fails gracefully decoding with bad charset', async () => {
  const url = 'https://github.com'
  try {
    const metadata = await urlMetadata(url, { decode: 'FOO-BAR' })
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('decoding with charset')
    expect(err.statusCode).toBe(200)
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
    expect(err.statusCode).toBeUndefined()
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
