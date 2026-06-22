const urlMetadata = require('./../index')

test('follow redirect on link shortener by default', async () => {
  const url = 'https://bit.ly/3Bg19uM'
  try {
    const metadata = await urlMetadata(url)
    expect(metadata.requestUrl).toBe(url)
    expect(metadata.url).not.toBe(url)
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('obey maxRedirects option; error with redirects property, correct shape', async () => {
  const url = 'https://t.co/3K2Oj1dRlE'
  try {
    const metadata = await urlMetadata(url, {
      maxRedirects: 0
    })
    // the ^code above should throw an error
    // if the following line fails it means
    // the test did not throw the proper error:
    expect(metadata.url).toBe(undefined)
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toBe('too many redirects')
    // Test error.redirects came back & in correct shape:
    expect(err.redirects).toBeDefined()
    expect(err.redirects.count).toBe(1)
    expect(err.redirects.chain[0]).toBeDefined()
    expect(err.redirects.chain[0].order).toBe(1)
    expect(err.redirects.chain[0].statusCode).toBeGreaterThan(300)
    expect(err.redirects.chain[0].statusCode).toBeLessThan(400)
    expect(err.redirects.chain[0].url).toBe(url)
  }
})
