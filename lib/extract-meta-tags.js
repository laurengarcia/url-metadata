const _ = require('underscore')

module.exports = function ($metaTags) {
  var extractedMetaTags = {}
  if ($metaTags) {
    _.each($metaTags, function ($meta) {
      if ($meta.attribs && $meta.attribs.name && $meta.attribs.content) {
        extractedMetaTags[$meta.attribs.name] = $meta.attribs.content
      }
      if ($meta.attribs && $meta.attribs.property && $meta.attribs.content) {
        extractedMetaTags[$meta.attribs.property] = $meta.attribs.content
      }
    })
  }
  return extractedMetaTags
}
