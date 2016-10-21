const q = require('q')
const request = require('request')
const parser = require('./lib/parser')

module.exports = function (url, options) {
  const dfd = q.defer()
  const requestOpts = {
    url: url,
    headers: {
      'User-Agent': 'LevelBot' || options.userAgent,
      'From': 'vision@levelnews.org' || options.fromEmail
    },
    maxRedirects: 8 || options.maxRedirects,
    encoding: 'utf8' || options.encoding,
    timeout: 10000 || options.timeout
  }

  request.get(requestOpts, function (err, response, body) {
    if (err || !response) {
      return dfd.reject({error: true}) // TODO: throw new error here
    }
    if (!response.statusCode && response.statusCode !== 200) {
      return dfd.reject({error: true}) // TODO: throw new error here
    }
    if (response.statusCode && response.statusCode === 200) {
      // rewrite url if our request had to follow redirects to resolve the
      // final link destination (for example: links shortened by bit.ly)
      if (response.request.uri.href) url = response.request.uri.href
      return dfd.resolve(parser(url, body, options))
    }
  })

  return dfd.promise
}
