module.exports = function ($) {
  const $linkTags = $('link')
  const extracted = []

  $linkTags.each(function (index, el) {
    if ($(this).attr('rel') && $(this).attr('rel') === 'icon') {
      extracted.push({
        type: $(this).attr('type'),
        href: $(this).attr('href'),
        sizes: $(this).attr('sizes')
      })
    }
  })

  return extracted
}
