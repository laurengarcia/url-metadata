const request = require('request')
const parse = require('./lib/parse')

module.exports = function (url, options) {
  if (!options || typeof options !== 'object') options = {}

  const opts = Object.assign(
    // defaults
    {
      userAgent: 'url-metadata/3.0 (npm module)',
      fromEmail: 'example@example.com',
      maxRedirects: 10,
      timeout: 10000,
      descriptionLength: 750,
      ensureSecureImageRequest: true,
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

  return new Promise((resolve, reject) => {
    request.get(requestOpts, (err, response) => {
      if (err || !response) {
        return reject(err);
      }
      if (response.statusCode && response.statusCode !== 200) {
        return reject({ Error: 'response code ' + response.statusCode });
      }

      // rewrite url if our request had to follow redirects to resolve the
      // final link destination (for example: links shortened by bit.ly)
      if (response.request.uri.href) url = response.request.uri.href;

      let body = response.body;
      if (opts.decode) {
        body = opts.decode(body);
      }

      resolve(parse(url, body, opts));
    });
  });
}
