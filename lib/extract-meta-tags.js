module.exports = function ($) {
  const $metaTags = $('meta')
  let extracted = {}

  $metaTags.each(function (index, el) {
    if ($(this).attr('content')) {
      if ($(this).attr('name')) {
        const metaTagName = $(this).attr('name')

        // Special handling of tags that begin with `citation_`
        // Google Scholar Spec:
        // https://www.google.com/intl/en/scholar/inclusion.html#indexing
        // Ex:
        //   https://scholarworks.montana.edu/xmlui/handle/1/3193 contains:
        //   <meta name="citation_author" content="Arlitsch, Kenning">
        //   <meta name="citation_author" content="OBrien, Patrick">
        // Returns as key<string>/value<array of strings> pair
        if (metaTagName.indexOf('citation_') === 0) {
          if (!extracted[metaTagName]) {
            extracted[metaTagName] = []
          }
          extracted[metaTagName].push($(this).attr('content'))

        // Handle all others as key<string>:value<string> pair
        } else {
          extracted = handleMulitpleValues(extracted, metaTagName, $(this).attr('content'))
        }
      }
      if ($(this).attr('property')) {
        extracted = handleMulitpleValues(extracted, $(this).attr('property'), $(this).attr('content'))
      }
      if ($(this).attr('itemprop')) {
        extracted = handleMulitpleValues(extracted, $(this).attr('itemprop'), $(this).attr('content'))
      }
      if ($(this).attr('http-equiv')) {
        extracted = handleMulitpleValues(extracted, $(this).attr('http-equiv'), $(this).attr('content'))
      }
    }
    // for <meta charset="utf-8">
    if ($(this).attr('charset')) {
      extracted.charset = $(this).attr('charset')
    }
  })

  return extracted
}

function handleMulitpleValues (extracted, key, value) {
  if (extracted[key]) {
    extracted[key] = extracted[key] + ',' + value
  } else {
    extracted[key] = value
  }
  return extracted
}
