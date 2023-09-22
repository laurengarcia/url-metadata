const clean = require('./clean')

module.exports = MetadataFields

/**
 * @ctor MetadataFields (chainable)
 * Returns basic metadata fields whose values will be filled in by the parser
 * after url request response. Most of these are Open Graph Protocol (og:) so
 * far: http://ogp.me/
 *
 */

function MetadataFields (options) {
  this.options = options || {}
  this.fields = {

    url: '',
    canonical: '',
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
    jsonld: {},

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

    responseBody: ''
  }

  return this
}

/**
 * @method `configureType` (chainable)
 * @param {string} `type`
 * Returns properties belonging to global types that are grouped into
 * verticals and generally agreed upon. In the following example, "music.song"
 * would be the type passed as an argument into this method. This method
 * currently only supports type `article`, however.
 * <meta property="og:type" content="music.song" />
 *
 * TODO: music, audio, video
 */
MetadataFields.prototype.configureType = function (type) {
  if (!type || (typeof type !== 'string')) return this
  const fieldsByType = {
    article: {
      'article:published_time': '',
      'article:modified_time': '',
      'article:expiration_time': '',
      'article:author': '',
      'article:section': '',
      'article:tag': '',
      'og:article:published_time': '',
      'og:article:modified_time': '',
      'og:article:expiration_time': '',
      'og:article:author': '',
      'og:article:section': '',
      'og:article:tag': ''
    }
  }
  if (fieldsByType[type]) this.fields = Object.assign({}, this.fields, fieldsByType[type])
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
