const urlMetadata = require('./../index')

test('redirect on link shortener', async () => {
  const url = 'https://bit.ly/3Bg19uM'
  try {
    const metadata = await urlMetadata(url)
    expect(metadata.requestUrl).toBe(url)
    expect(metadata.url).not.toBe(url)
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('obey maxRedirects option', async () => {
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
  }
})
