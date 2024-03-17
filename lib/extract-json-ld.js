// More info on JSON-LD (Linked Data):
// https://moz.com/blog/json-ld-for-beginners

module.exports = function ($) {
  const $scriptTags = $('script')
  const jsonLdObjects = []

  $scriptTags.each((index, el) => {
    try {
      if ($(el).attr('type') === 'application/ld+json') {
        const parsed = JSON.parse($(el).html())
        // The @graph technique in JSON-LD (Linked Data Format) syntax
        // is used to create a node array. The code begins with @graph
        // and then an open bracket, which opens the array and contains
        // a series of nodes.
        if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
          parsed['@graph'].forEach(item => jsonLdObjects.push(item))
        } else {
          jsonLdObjects.push(parsed)
        }
      }
    } catch (e) {
      // JSON.parse() error. do nothing, skip.
      // console.log(e.message)
    }
  })

  return jsonLdObjects.filter(item => !!item)
}
