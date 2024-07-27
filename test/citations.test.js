const urlMetadata = require('./../index')

test('citations', async () => {
  const url =
    'https://scholarworks.montana.edu/items/d1debd81-c9d6-448c-9e5f-08a0d8a1731d'
  try {
    const metadata = await urlMetadata(url)
    // checks an array is returned and both authors are included
    // page source specifies `citation_author` as two separate meta tags
    expect(metadata.citation_author.length).toBe(2)
  } catch (err) {
    expect(err).toBe(undefined)
  }
})
