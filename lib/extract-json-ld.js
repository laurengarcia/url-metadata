// More info on JSON-LD (Linked Data):
// https://moz.com/blog/json-ld-for-beginners

module.exports = function ($) {
  const $scriptTags = $('script')
  const jsonLdObjects = []

  $scriptTags.each((index, el) => {
    try {
      if ($(el).attr('type') === 'application/ld+json') {
        const parsed = JSON.parse($(el).html())
        jsonLdObjects.push(parsed)
      }
    } catch (e) {

    }
  })

  return jsonLdObjects.filter(item => !!item)
}
