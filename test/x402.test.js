const urlMetadata = require('./../index')

test('x402 v1 error', async () => {
  const url = 'https://x402.browserbase.com/browser/session/create'
  try {
    const metadata = await urlMetadata(url)
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {    expect(err.message).toContain('response code 402')
    expect(err.requestUrl).toBe(url)
    expect(err.redirects).toBeDefined()
    expect(err.url).toBe(url)
    expect(err.statusCode).toBe(402)
    expect(err.paymentRequired).toBe(true)
    expect(typeof err.x402.error).toBe('string')
    expect(err.x402.x402Version).toBe(1)
    expect(err.x402.accepts).toBeDefined()
  }
})

test('x402 v2 error', async () => {
  const url = 'https://minifetch.com/api/v1/x402/extract/url-metadata'
  try {
    const metadata = await urlMetadata(url)
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err.message).toContain('response code 402')
    expect(err.requestUrl).toBe(url)
    expect(err.redirects).toBeDefined()
    expect(err.url).toBe(url)
    expect(err.statusCode).toBe(402)
    expect(err.paymentRequired).toBe(true)
    expect(typeof err.x402.error).toBe('string')
    expect(err.x402.x402Version).toBe(2)
    expect(err.x402.accepts).toBeDefined()
  }
})
