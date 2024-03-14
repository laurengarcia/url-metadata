const clean = require('./clean')

module.exports = MetadataFields

/**
 * @ctor MetadataFields (chainable)
 * Returns basic metadata fields whose values will be filled in by the parser
 * after url request response.
 */

function MetadataFields (options) {
  this.options = options || {}
  this.fields = {

    requestUrl: '', // the url the user passed in
    url: '', // final hop in request chain
    canonical: '',
    lang: '',
    charset: '',
    title: '',
    image: '',
    favicons: [],
    author: '',
    description: '',
    keywords: '',
    source: '',
    price: '',
    priceCurrency: '',
    availability: '',
    robots: '',
    jsonld: [],

    // http://ogp.me/
    'og:url': '',
    'og:locale': '',
    'og:locale:alternate': '',
    'og:title': '',
    'og:type': '',
    'og:description': '',
    'og:determiner': '',
    'og:site_name': '',
    'og:image': '',
    'og:image:secure_url': '',
    'og:image:type': '',
    'og:image:width': '',
    'og:image:height': '',

    // https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
    'twitter:title': '',
    'twitter:description': '',
    'twitter:image': '',
    'twitter:image:alt': '',
    'twitter:card': '',
    'twitter:site': '',
    'twitter:site:id': '',
    'twitter:url': '',
    'twitter:account_id': '',
    'twitter:creator': '',
    'twitter:creator:id': '',
    'twitter:player': '',
    'twitter:player:width': '',
    'twitter:player:height': '',
    'twitter:player:stream': '',
    'twitter:app:name:iphone': '',
    'twitter:app:id:iphone': '',
    'twitter:app:url:iphone': '',
    'twitter:app:name:ipad': '',
    'twitter:app:id:ipad': '',
    'twitter:app:url:ipad': '',
    'twitter:app:name:googleplay': '',
    'twitter:app:id:googleplay': '',
    'twitter:app:url:googleplay': '',

    headings: [],
    imgTags: [],
    responseBody: ''
  }

  return this
}

/**
 * @method `set` (chainable)
 * @param obj must be in the form of {key: value}
 */
MetadataFields.prototype.set = function (obj) {
  if (obj) this.fields = Object.assign({}, this.fields, obj)
  return this
}

/**
* @method `get`
* @param key {string}
*/
MetadataFields.prototype.get = function (key) {
  return this.fields[key]
}

/**
 * @method `clean` (chainable)
 * clean up and return all fields
 */
MetadataFields.prototype.clean = function () {
  const self = this
  Object.keys(this.fields).forEach(function (key) {
    self.fields[key] = clean(key, self.fields[key], self.options)
  })
  return this.fields
}
