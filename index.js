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
      parseResponseObject: undefined
    },
    // options passed in override defaults
    options
  )

  if (!url && opts.parseResponseObject) {
    // ignore opts.decode bc response.text() already has own encoding
    return new Promise((resolve, reject) => {
      const exec = async () => {
        const text = await opts.parseResponseObject.text()
        resolve(parse('', '', text, opts))
      }
      exec().catch(reject)
    })
  } else {
    const requestOpts = {
      method: 'GET',
      headers: opts.requestHeaders,
      cache: opts.cache,
      mode: opts.mode,
      decode: opts.decode,
      timeout: opts.timeout,
      redirect: 'follow'
    }

    let requestUrl
    let destinationUrl
    let contentType

    return fetch(url, requestOpts)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`response code ${response.status}`)
        }

        // disambiguate `requestUrl` from final destination url
        // (ex: links shortened by bit.ly)
        requestUrl = url
        if (response.url) destinationUrl = response.url

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
        return parse(requestUrl, destinationUrl, responseDecoded, opts)
      })
  }
}
