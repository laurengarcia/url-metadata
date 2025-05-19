const nodeFetch = require('node-fetch')
const requestFilteringAgent = require('request-filtering-agent')
const extractCharset = require('./lib/extract-charset')
const parse = require('./lib/parse')

// ** Only in Node.js v18+ environments **
// To prevent SSRF attacks:
// Conditionally `useAgent` from `request-filtering-agent`
// --> https://www.npmjs.com/package/request-filtering-agent
// & no-op `useAgent` for older Node.js envs & the browser.
// Browser security policies prevent SSRF automatically.
let useAgent = () => undefined

// Node.js v18+ native fetch() API is not compatible with `useAgent`
// So we polyfill fetch on the Node.js v18+ side with `node-fetch` v2
let _fetch

// Check if we're in Node.js
const isNode = typeof process !== 'undefined' && process.versions && process.versions.node

if (isNode) {
  // In Node.js, use `node-fetch` module with SSRF protection
  _fetch = nodeFetch
  useAgent = requestFilteringAgent.useAgent
} else {
  // In browser, use native fetch
  _fetch = typeof window !== 'undefined' ? window.fetch.bind(window) : globalThis.fetch
  // No-op in browser
  useAgent = () => undefined
}

// Ensure we have a working fetch
if (!_fetch) {
  throw new Error('No fetch implementation available')
}

module.exports = function (url, options) {
  if (!options || typeof options !== 'object') options = {}

  const opts = Object.assign(
    // defaults
    {
      requestHeaders: {
        'User-Agent': 'url-metadata (+https://www.npmjs.com/package/url-metadata)',
        From: 'example@example.com'
      },
      requestFilteringAgentOptions: undefined, // Node.js v18+ only, silently ignored by others
      cache: 'no-cache', // Browser only
      mode: 'cors', // Browser only
      maxRedirects: 10,
      timeout: 10000,
      size: 0, // Node.js v6+ only; silently ignored by others
      compress: true, // Node.js v6+ only; silently ignored by others
      decode: 'auto',
      descriptionLength: 750,
      ensureSecureImageRequest: true,
      includeResponseBody: false,
      parseResponseObject: undefined
    },
    // user options override defaults
    options
  )

  let requestUrl = ''
  let destinationUrl = ''
  let contentType
  let charset
  let currentResponse = null

  async function fetchData (_url, redirectCount = 0) {
    if (redirectCount > opts.maxRedirects) {
      throw new Error('too many redirects')
    }
    if (!_url && opts.parseResponseObject) {
      return opts.parseResponseObject
    } else if (_url) {
      requestUrl = url
      const requestOpts = {
        method: 'GET',
        headers: opts.requestHeaders,
        agent: useAgent(url, opts.requestFilteringAgentOptions),
        cache: opts.cache,
        mode: opts.mode,
        redirect: 'manual',
        timeout: opts.timeout,
        size: opts.size,
        compress: opts.compress
      }

      // Make the fetch request
      const response = await _fetch(_url, requestOpts)

      if (response.status >= 300 && response.status < 400 && response.headers.get('location')) {
        const newUrl = new URL(response.headers.get('location'), url).href
        return fetchData(newUrl, redirectCount + 1)
      }
      return response
    } else if (!_url) {
      throw new Error('url parameter is missing')
    }
  }

  return new Promise((resolve, reject) => {
    fetchData(url)
      .then((response) => {
        if (!response) {
          return reject(new Error(`response is ${typeof response}`))
        }
        if (!response.ok) {
          return reject(new Error(`response code ${response.status}`))
        }

        // Set `currentResponse` in case of error
        currentResponse = response

        // disambiguate `requestUrl` from final destination url
        // (ex: links shortened by bit.ly)
        if (response.url) destinationUrl = response.url

        // validate response content type
        contentType = response.headers.get('content-type')
        const isText = contentType && contentType.startsWith('text')
        const isHTML = contentType && contentType.includes('html')
        if (!isText || !isHTML) {
          return reject(new Error(`unsupported content type: ${contentType}`))
        }

        return response.arrayBuffer()
      })
      .then(async (responseBuffer) => {
        if (!responseBuffer) return

        // handle optional user-specified charset
        if (opts.decode !== 'auto') {
          charset = opts.decode
        // extract charset in opts.decode='auto' mode
        } else {
          charset = extractCharset(contentType, responseBuffer)
        }

        // decode with charset
        try {
          const decoder = new TextDecoder(charset)
          const responseDecoded = decoder.decode(responseBuffer)
          resolve(parse(requestUrl, destinationUrl, responseDecoded, opts))
        } catch (e) {
          return reject(new Error(`decoding with charset: ${charset}`))
        }
      })
      .catch(error => {
        // Cleanup resources to avoid memory leaks
        if (currentResponse && currentResponse.body) {
          // Destroy the body stream `node-fetch` uses to force-close the connection
          if (typeof currentResponse.body.destroy === 'function') currentResponse.body.destroy()
          // Modern browsers and Node.js 18+ have cancel() on the ReadableStream
          else if (typeof currentResponse.body.cancel === 'function') currentResponse.body.cancel().catch(() => {})
          // Fallback: consume the stream to close the connection
          else if (typeof currentResponse.text === 'function') currentResponse.text().catch(() => {})
        }
        // Finally, reject
        return reject(error)
      })
  })
}
