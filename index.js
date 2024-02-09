const extractCharset = require('./lib/extract-charset')
const parse = require('./lib/parse')

module.exports = function (url, options) {
  if (!options || typeof options !== 'object') options = {}

  const opts = Object.assign(
    // defaults
    {
      requestHeaders: {
        'User-Agent': 'url-metadata/3.0 (npm module)',
        From: 'example@example.com'
      },
      cache: 'no-cache',
      mode: 'cors',
      decode: 'auto',
      timeout: 10000,
      descriptionLength: 750,
      ensureSecureImageRequest: true,
      includeResponseBody: false,
      parseResponseObject: null
    },
    // options passed in override defaults
    options
  )

  let requestUrl = ''
  let destinationUrl = ''
  let contentType
  let charset

  async function fetchData () {
    if (!url && opts.parseResponseObject) {
      return opts.parseResponseObject
    } else if (url) {
      requestUrl = url
      const requestOpts = {
        method: 'GET',
        headers: opts.requestHeaders,
        cache: opts.cache,
        mode: opts.mode,
        decode: opts.decode,
        timeout: opts.timeout,
        redirect: 'follow'
      }
      return await fetch(url, requestOpts)
    } else if (!url) {
      throw new Error('url parameter is missing')
    }
  }

  return new Promise((resolve, reject) => {
    fetchData()
      .then((response) => {
        if (!response) {
          reject(new Error(`response is ${typeof response}`))
        }
        if (!response.ok) {
          reject(new Error(`response code ${response.status}`))
        }

        // disambiguate `requestUrl` from final destination url
        // (ex: links shortened by bit.ly)
        if (response.url) destinationUrl = response.url

        // validate response content type
        contentType = response.headers.get('content-type')
        const isText = contentType && contentType.startsWith('text')
        const isHTML = contentType && contentType.includes('html')
        if (!isText || !isHTML) {
          reject(new Error(`unsupported content type: ${contentType}`))
        }

        return response.arrayBuffer()
      })
      .then(async (responseBuffer) => {
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
          reject(new Error(`decoding with charset: ${charset}`))
        }
      })
      .catch(reject)
  })
}
