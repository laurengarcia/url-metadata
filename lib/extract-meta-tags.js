module.exports = function ($) {
  const $metaTags = $('meta')
  const extracted = {}

  $metaTags.each(function (index, el) {
    if ($(this).attr('content')) {
      if ($(this).attr('name')) {
        const metaTagName = $(this).attr('name')
        // Special handling of citations
        // Spec: https://www.google.com/intl/en/scholar/inclusion.html#indexing
        // Ex:
        //   https://scholarworks.montana.edu/xmlui/handle/1/3193 contains:
        //   <meta name="citation_author" content="Arlitsch, Kenning">
        //   <meta name="citation_author" content="OBrien, Patrick">
        // Returns as <key>:<array> pair (unlike other tags)
        if (metaTagName.indexOf('citation_') === 0) {
          if (!extracted[metaTagName]) {
            extracted[metaTagName] = []
          }
          extracted[metaTagName].push($(this).attr('content'))
        // Else handle normally as key/value<string> pair
        } else {
          extracted[metaTagName] = $(this).attr('content')
        }
      }
      if ($(this).attr('property')) {
        extracted[$(this).attr('property')] = $(this).attr('content')
      }
      if ($(this).attr('itemprop')) {
        extracted[$(this).attr('itemprop')] = $(this).attr('content')
      }
    }
  })

  return extracted
}
