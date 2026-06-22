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

test('fails gracefully on DNS errors', async () => {
  try {
    const url = 'https://something.invalid'
    const metadata = await urlMetadata(url)
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.statusCode).toBeUndefined()
    expect(err.redirects).toBeUndefined()
    // The error props thrown by `node-fetch` fall thru:
    expect(err.message).toContain('getaddrinfo ENOTFOUND')
    expect(err.type).toBe('system')
    // ENOTFOUND = Error: Not Found = DNS lookup error from `node-fetch`
    expect(err.errno).toBe('ENOTFOUND')
    expect(err.code).toBe('ENOTFOUND')
  }
})

test('fails gracefully on 403 blocks', async () => {
  const url = 'https://www.npmjs.com/packageXXX/url-metadataXXX'
  try {
    const metadata = await urlMetadata(url)
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('response code 403')
    expect(err.requestUrl).toBe(url)
    expect(err.redirects).toBeDefined()
    expect(err.url).toBe(url)
    expect(err.statusCode).toBe(403)
  }
})

test('fails gracefully on 404', async () => {
  const url = 'https://nichenetworks.io/foo'
  try {
    const metadata = await urlMetadata(url)
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err).toBeDefined()
    // test response shape:
    expect(err.message).toContain('response code 404')
    expect(err.requestUrl).toBe(url)
    expect(err.redirects).toBeDefined()
    expect(err.url).toBe(url)
    expect(err.statusCode).toBe(404)
  }
})

test('fails gracefully when fetching non text/html', async () => {
  const url = 'https://minifetch.com/llms.txt'
  try {
    const metadata = await urlMetadata(url)
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err).toBeDefined()
    // test response shape:
    expect(err.message).toContain('unsupported content type')
    expect(err.requestUrl).toBe(url)
    expect(err.redirects).toBeDefined()
    expect(err.url).toBe(url)
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
