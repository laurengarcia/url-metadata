module.exports = function ($metaTags) {
  var extracted = {}
  if ($metaTags) {
    Object.keys($metaTags).forEach(function (key, index) {
      if ($metaTags[key].attribs && $metaTags[key].attribs.name && $metaTags[key].attribs.content) {
        extracted[$metaTags[key].attribs.name] = $metaTags[key].attribs.content
      }
      if ($metaTags[key].attribs && $metaTags[key].attribs.property && $metaTags[key].attribs.content) {
        extracted[$metaTags[key].attribs.property] = $metaTags[key].attribs.content
      }
    })
  }
  return extracted
}
