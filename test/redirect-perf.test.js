const urlMetadata = require('./../index')
const main = require('./../main')

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
    // Test `metadata.performance` shape. `ttfbMs` includes `redirectTimeMs`
    // (Google/web.dev TTFB semantics), so ttfbMs > redirectTimeMs
    expect(metadata.performance).toBeDefined()
    expect(metadata.performance.redirectTimeMs).toBeGreaterThan(0)
    expect(metadata.performance.ttfbMs).toBeGreaterThan(0)
    expect(metadata.performance.ttfbMs).toBeGreaterThan(metadata.performance.redirectTimeMs)
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
    const url = 'https://bit.ly/4uIArop' // redirects to httpforever.com
    const metadata = await urlMetadata(url, { maxRedirects: 2 })
    expect(metadata.redirects.count).toBeGreaterThan(0)
    expect(metadata.performance).toBeDefined()
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('http:// -> https:// redirect success', async () => {
  try {
    const url = 'http://bit.ly/4oFgU6Q' // redirects http:// -> https://minifetch.com
    const metadata = await urlMetadata(url)
    expect(metadata.redirects.count).toBeGreaterThan(0)
    // Test metadata.performance shape. ttfbMs > redirectTimeMs as above
    expect(metadata.performance).toBeDefined()
    expect(metadata.performance.redirectTimeMs).toBeGreaterThan(0)
    expect(metadata.performance.ttfbMs).toBeGreaterThan(0)
    expect(metadata.performance.ttfbMs).toBeGreaterThan(metadata.performance.redirectTimeMs)
    expect(metadata.performance.responseTimeMs).toBeGreaterThan(metadata.performance.ttfbMs)
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('strips sensitive headers on cross-host redirect hops only', async () => {
  // Mock fetch: same-host hop, then cross-host hop, then 200 html.
  // Records the headers each hop receives.
  const hops = []
  const mockHeaders = (obj) => {
    const map = new Map(Object.entries(obj))
    return {
      get: (k) => (map.has(k.toLowerCase()) ? map.get(k.toLowerCase()) : null),
      forEach: (fn) => map.forEach(fn)
    }
  }
  const routes = {
    'https://origin.example.com/start': {
      status: 301,
      headers: mockHeaders({ location: 'https://origin.example.com/step' })
    },
    'https://origin.example.com/step': {
      status: 301,
      headers: mockHeaders({ location: 'https://elsewhere.example.net/final' })
    },
    'https://elsewhere.example.net/final': {
      status: 200,
      ok: true,
      url: 'https://elsewhere.example.net/final',
      headers: mockHeaders({ 'content-type': 'text/html; charset=utf-8' }),
      arrayBuffer: async () => new TextEncoder().encode(
        '<html><head><title>ok</title></head><body></body></html>'
      ).buffer
    }
  }
  const mockFetch = async (url, requestOpts) => {
    hops.push({ url, headers: requestOpts.headers })
    return routes[url]
  }
  const noopAgent = () => undefined

  const metadata = await main('https://origin.example.com/start', {
    requestHeaders: {
      'User-Agent': 'url-metadata test',
      Authorization: 'Bearer hunter2',
      Cookie: 'session=abc123'
    }
  }, mockFetch, noopAgent)

  expect(metadata.redirects.count).toBe(2)
  expect(hops.length).toBe(3)
  // Hop 1 (original request): all headers present
  expect(hops[0].url).toBe('https://origin.example.com/start') // original request
  expect(hops[0].headers.Authorization).toBe('Bearer hunter2')
  expect(hops[0].headers.Cookie).toBe('session=abc123')
  // Hop 2 (same host): credentials still forwarded
  expect(hops[1].url).toBe('https://origin.example.com/step') // 1st hop: same host
  expect(hops[1].headers.Authorization).toBe('Bearer hunter2')
  expect(hops[1].headers.Cookie).toBe('session=abc123')
  // Hop 3 (cross host): credentials stripped, benign headers kept
  expect(hops[2].url).toBe('https://elsewhere.example.net/final') // 2nd hop: diff host
  expect(hops[2].headers.Authorization).toBe(undefined)
  expect(hops[2].headers.Cookie).toBe(undefined)
  expect(hops[2].headers['User-Agent']).toBe('url-metadata test')
})

test('errors properly when redirect is blocked', async () => {
  const url = 'https://bit.ly/4fjrqxy' // redirects to amazon profile (blocked)
  try {
    const metadata = await urlMetadata(url)
    console.log(metadata)
    // the ^code above should throw an error
    // if the following line fails it means
    // the test did not throw the proper error:
    expect(metadata.url).toBe(undefined)
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toBe('response code 400')
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
