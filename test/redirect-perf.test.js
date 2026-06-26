const urlMetadata = require('./../index')

test('follow redirects by default; redirects + performance props have correct shape', async () => {
  const url = 'https://t.co/3K2Oj1dRlE'
  try {
    const metadata = await urlMetadata(url)
    expect(metadata.requestUrl).toBe(url)
    expect(metadata.url).not.toBe(url)
    // Test metadata.redirects came back & in correct shape:
    expect(metadata.redirects).toBeDefined()
    expect(metadata.redirects.count).toBeGreaterThan(0)
    expect(metadata.redirects.chain[0]).toBeDefined()
    expect(metadata.redirects.chain[0].order).toBe(1)
    expect(metadata.redirects.chain[0].statusCode).toBeGreaterThan(300)
    expect(metadata.redirects.chain[0].statusCode).toBeLessThan(400)
    expect(metadata.redirects.chain[0].url).toBe(url)
    // Test metadata.performance shape
    expect(metadata.performance).toBeDefined()
    expect(metadata.performance.redirectTimeMs).toBeGreaterThan(0)
    expect(metadata.performance.ttfbMs).toBeGreaterThan(0)
    expect(metadata.performance.responseTimeMs).toBeGreaterThan(metadata.performance.ttfbMs)
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('obey maxRedirects option; error returns redirects property w correct shape', async () => {
  const url = 'http://minifetch.com' // http:// should redirect to https://
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

test('https:// -> http:// redirect success', async () => {
  try {
    const url = 'https://bit.ly/4uIArop'
    const metadata = await urlMetadata(url, { maxRedirects: 2 })
    expect(metadata.redirects.count).toBeGreaterThan(0)
    expect(metadata.performance).toBeDefined()
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('http:// -> https:// redirect success', async () => {
  try {
    const url = 'http://bit.ly/4oFgU6Q'
    const metadata = await urlMetadata(url)
    expect(metadata.redirects.count).toBeGreaterThan(0)
    // Test metadata.performance shape
    expect(metadata.performance).toBeDefined()
    expect(metadata.performance.redirectTimeMs).toBeGreaterThan(0)
    expect(metadata.performance.ttfbMs).toBeGreaterThan(0)
    expect(metadata.performance.responseTimeMs).toBeGreaterThan(metadata.performance.ttfbMs)
  } catch (err) {
    expect(err).toBe(undefined)
  }
})
