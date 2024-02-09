const urlMetadata = require('./../index')

test('fails gracefully with malformed url param', async () => {
  const url = 'XYZ'
  try {
    await urlMetadata(url)
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('Failed to parse')
  }
})

test('fails gracefully when url param is missing', async () => {
  try {
    await urlMetadata(null)
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('url parameter is missing')
  }
})

test('fails gracefully on !response.ok', async () => {
  // should 404
  const url = 'http://www.foo.com/imagesz/resized_and_crop/'
  try {
    await urlMetadata(url)
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('response code')
  }
})

test('fails gracefully when fetching non text/html', async () => {
  const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/500px-International_Pok%C3%A9mon_logo.svg.png'
  try {
    await urlMetadata(url)
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('unsupported content type')
  }
})

test('fails gracefully decoding with bad charset', async () => {
  const url = 'https://www.npmjs.com/package/url-metadata'
  try {
    await urlMetadata(url, { decode: 'FOO-BAR' })
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('decoding with charset')
  }
})

test('fails gracefully when option `parseResponseObject` is empty object', async () => {
  try {
    // pass null `url` param & empty response object
    await urlMetadata(null, { parseResponseObject: {} })
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('response code undefined')
  }
})

test('fails gracefully when option: `parseResponseObject` is null AND url is null', async () => {
  try {
    await urlMetadata(null, { parseResponseObject: null })
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('url parameter is missing')
  }
})
