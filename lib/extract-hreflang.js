module.exports = function ($) {
  const $linkTags = $('link')
  const extracted = []

  $linkTags.each(function (index, el) {
    const hreflang = $(this).attr('hreflang')
    if (hreflang) {
      const attrs = {
        hreflang: $(this).attr('hreflang'),
        href: $(this).attr('href')
      }
      extracted.push(attrs)
    }
  })

  return extracted
}
