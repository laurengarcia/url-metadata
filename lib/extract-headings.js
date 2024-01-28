module.exports = function ($) {
  const $headings = $('h1, h2, h3, h4, h5, h6')
  const extracted = []

  $headings.each(function (index, el) {
    const heading = {
      level: el.name,
      content: $(el).text()
    }
    extracted.push(heading)
  })

  return extracted
}
