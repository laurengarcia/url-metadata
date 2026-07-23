const urlMetadata = require('./../index')

// To run this test file standalone:
// npx jest test/proxy.test.js --detectOpenHandles
// or
// npx jest test/proxy.test.js --detectOpenHandles -t "call with params"

// ScraperAPI
const proxyUrl1 = 'https://api.scraperapi.com/'
const apiKey1 = process.env.SCRAPERAPI_KEY
// ScrapingAnt
const proxyUrl2 = 'https://api.scrapingant.com/v2/general'
const apiKey2 = process.env.SCRAPINGANT_API_KEY

test('proxy: omitting proxyUrl with proxyParams errors out', async () => {
  if (!apiKey1) throw new Error('Set SCRAPERAPI_KEY env var to run this test')
  const url = 'https://minifetch.com'
  try {
    const metadata = await urlMetadata(url, {
      proxyParams: { api_key: apiKey1 }
    })
    expect(metadata.responseStatusCode).toBe(200)
    // shouldn't get here but just in case
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('proxyUrl')
  }
})

test('proxy: ScraperAPI basic call', async () => {
  if (!apiKey1) throw new Error('Set SCRAPERAPI_KEY env var to run this test')
  const url = 'https://minifetch.com'
  try {
    const metadata = await urlMetadata(url, {
      proxyUrl: proxyUrl1,
      proxyParams: { api_key: apiKey1 }
    })
    expect(metadata.responseStatusCode).toBe(200)
    expect(metadata.title).toContain('SEO')
  } catch (err) {
    expect(err).toBe(undefined)
  }
}, 60000)

test('proxy: ScraperAPI call with params', async () => {
  if (!apiKey1) throw new Error('Set SCRAPERAPI_KEY env var to run this test')
  const url = 'https://quotes.toscrape.com/js/'
  // const url = 'https://www.ebay.com/itm/358599586518' // works w `premium:true` param
  // const url = 'https://www.amazon.com/MOUNTO-Filter-Replacement-HEPA500-pre-Filter/dp/B07G9234QL' // fails
  try {
    const metadata = await urlMetadata(url, {
      includeResponseBody: true,
      proxyUrl: proxyUrl1,
      proxyParams: {
        api_key: apiKey1,
        // No extra credit cost: wait_for_selector, country_code,
        //   session_number, device_type, keep_headers
        // Extra credit cost: premium, render, screenshot, ultra_premium
        //
        // render: true, // works, with caveats in README
        // country_code: 'us', // works, get results from a specific region
        // premium: true, // works, run thru residential proxies
        // 'ultra_premium': true, advanced bypassing, bump `timeout` option higher
        screenshot: true // works, triggers render: true, check `sa-screenshot` response header
      }
    })
    expect(metadata.responseStatusCode).toBe(200)
    expect(metadata.responseHeaders['sa-screenshot']).toBeDefined()
    expect(metadata.responseHeaders['sa-credit-cost']).toBeDefined()
  } catch (err) {
    expect(err).toBe(undefined)
  }
}, 60000)


test('proxy: ScrapingAnt basic call', async () => {
  if (!apiKey2) throw new Error('Set SCRAPINGANT_API_KEY env var to run this test')
  const url = 'https://minifetch.com/docs/api'
  // const url = 'https://quotes.toscrape.com/js/'
  // const url = 'nike.com' // works, returns french when `proxy_country` set to 'fr'
  // const url = 'https://www.amazon.com/MOUNTO-Filter-Replacement-HEPA500-pre-Filter/dp/B07G9234QL' // works
  // const url = 'https://www.ebay.com/itm/358599586518' // fails
  try {
    const metadata = await urlMetadata(url, {
      // includeResponseBody: true,
      proxyUrl: proxyUrl2,
      proxyParams: {
        'x-api-key': apiKey2,
        // browser: false, // works, turns off default rendering
        // 'proxy_type': 'residential',
        // 'proxy_country': 'fr', // works, country to make request from
        // 'wait_for_selector': 'h1' // speed up scraping time
        // 'block_resource': 'stylesheet' // speed up scraping time
      }
    })
    expect(metadata.responseStatusCode).toBe(200)
    expect(metadata.title).toContain('API')
  } catch (err) {
    expect(err).toBe(undefined)
  }
}, 60000)

test('proxy: ScrapingAnt api key in header', async () => {
  if (!apiKey2) throw new Error('Set SCRAPINGANT_API_KEY env var to run this test')
  const url = 'https://minifetch.com/docs/api'

  try {
    const metadata = await urlMetadata(url, {
      requestHeaders: {
        'x-api-key': apiKey2
      },
      proxyUrl: proxyUrl2,
      proxyParams: {}
    })
    expect(metadata.responseStatusCode).toBe(200)
    expect(metadata.title).toContain('API')
  } catch (err) {
    expect(err).toBe(undefined)
  }
}, 60000)
