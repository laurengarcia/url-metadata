const q = require('q')
const request = require('request')
const parse = require('./lib/parse')

module.exports = function (url, options) {
  const dfd = q.defer()
  if (!options || typeof options !== 'object') options = {}
  const opts = Object.assign(
    // defaults
    {
      userAgent: 'MetadataScraper',
      fromEmail: 'example@example.com',
      maxRedirects: 10,
      timeout: 10000,
      descriptionLength: 750,
      ensureSecureImageRequest: true,
      sourceMap: {},
      decode: undefined,
      encode: undefined
    },
    // options passed in override defaults
    options
  )

  const requestOpts = {
    url: url,
    headers: {
      'User-Agent': opts.userAgent,
      'From': opts.fromEmail
    },
    maxRedirects: opts.maxRedirects,
    encoding: opts.decode ? null : 'utf8',
    timeout: opts.timeout
  }
  request.get(requestOpts, function (err, response, body) {
    if (err || !response) {
      return dfd.reject(err)
    }
    if (response.statusCode && response.statusCode !== 200) {
      return dfd.reject({ Error: 'response code ' + response.statusCode })
    }
    if (response.statusCode && response.statusCode === 200) {
      // rewrite url if our request had to follow redirects to resolve the
      // final link destination (for example: links shortened by bit.ly)
      if (response.request.uri.href) url = response.request.uri.href
      if (opts.decode) {
        body = opts.decode(body)
      }
      return dfd.resolve(parse(url, body, opts))
    }
  })

  return dfd.promise
}
