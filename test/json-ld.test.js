const urlMetadata = require('./../index')

test('retrieves json-ld if url has it', async () => {
  const url = 'https://www.coindesk.com/twitter-systemically-important-financial-regulators'
  try {
    const metadata = await urlMetadata(url)
    expect(typeof metadata.jsonld).toBe('object')
    expect(typeof metadata.jsonld.headline).toBe('string')
    expect(typeof metadata.jsonld.datePublished).toBe('string')
  } catch (err) {
    expect(err).toBe(undefined)
  }
})
