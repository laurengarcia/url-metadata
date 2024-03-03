const urlMetadata = require('./../index')

test('retrieves json-ld if url has it', async () => {
  const url = 'https://www.coindesk.com/twitter-systemically-important-financial-regulators'
  try {
    const metadata = await urlMetadata(url)
    expect(typeof metadata.jsonld[0]).toBe('object')
    expect(typeof metadata.jsonld[0].headline).toBe('string')
    expect(typeof metadata.jsonld[0].datePublished).toBe('string')
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('retrieves multiple json-ld objects if url has it', async () => {
  const url = 'https://goout.net/cs/metronome-prague-2024/szpsfuw/'
  const metadata = await urlMetadata(url)
  expect(metadata.jsonld.length).toBe(2)
  expect(metadata.jsonld[0]['@type']).toBe('Event')
  expect(metadata.jsonld[1]['@type']).toBe('BreadcrumbList')
})
