const urlMetadata = require('./../index')

test('citations', async () => {
  const url = 'https://scholarworks.montana.edu/xmlui/handle/1/3193'
  try {
    const metadata = await urlMetadata(url)
    // checks an array is returned and both authors are included
    // page source specifies `citation_author` as two separate meta tags
    expect(metadata.citation_author.length).toBe(2)
  } catch (err) {
    expect(err).toBe(undefined)
  }
})
