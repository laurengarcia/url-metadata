const urlMetadata = require('./../index')

test('fails gracefully with malformed URL', async () => {
  const url = 'XYZ'
  try {
    await urlMetadata(url)
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('Failed to parse')
  }
})

test('fails gracefully on !response.ok', async () => {
  const url = 'http://www.foo.com/imagesz/resized_and_crop/'
  try {
    await urlMetadata(url)
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('response code')
  }
})

// BUG: throws error but hangs
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
