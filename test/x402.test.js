const urlMetadata = require('./../index')

test('x402 v1 error', async () => {
  // They may upgrade to v2 at some point, we will mock v1 then:
  const url = 'https://x402.browserbase.com/browser/session/create'
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

test('generic 402 response gets generic error', async () => {
  const mockResponse = new Response("{ 'foo': 'bar' }", {
    url: 'https://example.com/paid',
    status: 402,
    headers: {
      'Content-Type': 'text/plain'
    }
  })
  try {
    const metadata = await urlMetadata(null, {
      parseResponseObject: mockResponse
    })
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err.message).toContain('response code 402')
    expect(err.redirects).toBeDefined()
    expect(err.statusCode).toBe(402)
  }
})

// JSON content-type + body, no x402 markers (the MPP / quota-error case)
// response.json() parse → .then() success arm → generic err
test('402 w JSON body but no x402 markers gets generic error', async () => {
  const mockResponse = new Response("{ 'error': 'quota exceeded' }", {
    url: 'https://example.com/paid',
    status: 402,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  try {
    const metadata = await urlMetadata(null, {
      parseResponseObject: mockResponse
    })
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err.message).toContain('response code 402')
    expect(err.redirects).toBeDefined()
    expect(err.statusCode).toBe(402)
  }
})

// JSON content-type but unparseable body
// response.json() parse → .then failure arm → generic err
test('402 w unparse-able body gets generic error', async () => {
  const mockResponse = new Response('{ burp }', {
    url: 'https://example.com/paid',
    status: 402,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  try {
    const metadata = await urlMetadata(null, {
      parseResponseObject: mockResponse
    })
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err.message).toContain('response code 402')
    expect(err.redirects).toBeDefined()
    expect(err.statusCode).toBe(402)
  }
})
