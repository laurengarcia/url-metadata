const utils = require('./utils')

module.exports = function ($) {
  const $headings = $('h1, h2, h3, h4, h5, h6')
  const extracted = []

  $headings.each(function (index, el) {
    const heading = {
      level: el.name,
      text: utils.stripNewlines($(el).text().trim())
    }
    extracted.push(heading)
  })

  return extracted
}
