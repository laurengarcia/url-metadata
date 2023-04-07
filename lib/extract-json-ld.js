// More info on JSON-LD (Linked Data):
// https://moz.com/blog/json-ld-for-beginners

module.exports = function ($) {
  const $scriptTags = $('script')
  let extracted = {}

  try {
    $scriptTags.each(function (index, el) {
      if ($(this).attr('type') && $(this).attr('type') === 'application/ld+json') {
        extracted = JSON.parse($(this).text())
      }
    })
  } catch (e) {}

  return extracted
}
