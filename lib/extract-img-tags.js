module.exports = function ($) {
  const extracted = []

  $('img').each((index, element) => {
    const $element = $(element)
    const imgData = {
      src: $element.attr('src'),
      alt: $element.attr('alt'),
      title: $element.attr('title'),
      width: $element.attr('width'),
      height: $element.attr('height')
    }
    extracted.push(imgData)
  })

  return extracted
}
