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
      includeResponseBody: false
    },
    // options passed in override defaults
    options
  )

  const requestOpts = {
    method: 'GET',
    headers: opts.requestHeaders,
    cache: opts.cache,
    mode: opts.mode,
    decode: opts.decode,
    timeout: opts.timeout,
    redirect: 'follow'
  }

  let contentType

  return fetch(url, requestOpts)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`response code ${response.status}`)
      }

      // rewrite url if our request had to follow redirects to resolve the
      // final link destination (for example: links shortened by bit.ly)
      if (response.url) url = response.url

      contentType = response.headers.get('content-type')
      const isText = contentType && contentType.startsWith('text')
      const isHTML = contentType && contentType.includes('html')

      if (!isText || !isHTML) {
        throw new Error(`unsupported content type: ${contentType}`)
      }

      return response.arrayBuffer()
    })
    .then((responseBuffer) => {
      let charset

      // handle optional user-specified charset
      if (opts.decode !== 'auto') {
        charset = opts.decode
      } else {
        // extract charset in opts.decode='auto' mode
        charset = extractCharset(contentType, responseBuffer)
      }
      try {
        const decoder = new TextDecoder(charset)
        return decoder.decode(responseBuffer)
      } catch (e) {
        throw new Error(`decoding with charset: ${charset}`)
      }
    })
    .then((responseDecoded) => {
      return parse(url, responseDecoded, opts)
    })
}
