module.exports = function ($) {
  const $metaTags = $('meta')
  var extracted = {}

  $metaTags.each(function (index, el) {
    if ($(this).attr('content')) {
      if ($(this).attr('name')) {
        extracted[$(this).attr('name')] = $(this).attr('content')
      }
      if ($(this).attr('property')) {
        extracted[$(this).attr('property')] = $(this).attr('content')
      }
    }
  })

  return extracted
}
