module.exports = function ($) {
  const $linkTags = $('link')
  const extracted = []

  $linkTags.each(function (index, el) {
    const rel = $(this).attr('rel')
    if (rel && (
      rel === 'icon' ||
      rel === 'shortcut icon' ||
      rel === 'alternate icon' ||
      rel === 'apple-touch-icon' ||
      rel === 'mask-icon' || // Safari pinned tab favicon
      $(this).attr('sizes')
    )) {
      const attrs = {
        rel: $(this).attr('rel'),
        type: $(this).attr('type'),
        href: $(this).attr('href'),
        sizes: $(this).attr('sizes')
      }
      if (rel === 'mask-icon') attrs.color = $(this).attr('color')
      extracted.push(attrs)
    }
  })

  return extracted
}
