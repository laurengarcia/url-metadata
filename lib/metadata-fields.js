var _ = require('underscore')
var utils = require('./utils')

module.exports = MetadataFields

/**
 * @ctor MetadataFields
 * Returns basic metadata fields whose values will be filled in by the parser
 * after url request response. Most of these are Open Graph Protocol (og:) so
 * far: http://ogp.me/
 *
 * TODO: protocols `sailthru`, `parseley`, `twitter`, `dcterms`
 */

function MetadataFields (url) {
  this.fields = {
    'url': utils.encode(url),
    'title': '',
    'image': '',
    'author': '',
    'description': '',
    'source': '',
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
    'og:image:height': ''
  }

  return this
}

MetadataFields.prototype.get = function () {
  return this.fields
}

/**
 * @method `setType`
 * @arg {string} `type`
 * Returns properties belonging to global types that are grouped into
 * verticals and generally agreed upon. In the following example, "music.song"
 * would be the type passed as an argument into this method. This method
 * currently only supports type `article`, however.
 * <meta property="og:type" content="music.song" />
 *
 * TODO: music, audio, video
 */
MetadataFields.prototype.setType = function (type) {
  if (typeof type !== 'string') return
  var self = this
  var fieldsByType = {
    'article': {
      'article:published_time': null,
      'article:modified_time': null,
      'article:expiration_time': null,
      'article:author': '',
      'article:section': '',
      'article:tag': '',
      'og:article:published_time': null, // datetime iso8601
      'og:article:modified_time': null, // datetime iso8601
      'og:article:expiration_time': null, // datetime iso8601
      'og:article:author': '',
      'og:article:section': '',
      'og:article:tag': ''
    }
  }

  if (fieldsByType[type]) _.extend(self.fields, fieldsByType[type])
  return this
}
