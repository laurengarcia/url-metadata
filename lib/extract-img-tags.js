module.exports = function ($) {
  const extracted = []

  $('img').each((index, element) => {
    const $element = $(element)
    const imgData = {
      src: $element.attr('src'),
      alt: $element.attr('alt'),
      width: $element.attr('width'),
      height: $element.attr('height'),
      title: $element.attr('title')
    }
    extracted.push(imgData)
  })

  return extracted
}
