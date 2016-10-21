module.exports = {

  encode: function (str) {
    return encodeURIComponent(str).replace(/['*]/g, escape)
  },

  decode: function (str) {
    return decodeURIComponent(str).replace(/['*]/g, unescape)
  },

  cleanTitleString: function (value) {
    if (typeof value !== 'string') return value
    // remove any newline characters, replace with space:
    value = value.replace(/\n|\r/gm, ' ')
    // remove double spaces, replace with single spaces:
    value = value.replace(/( {2,})/gm, ' ')
    return value
  },

  truncate: function (content, length) {
    if (typeof content !== 'string') return ''
    if (content.length <= length) return content
    return content.substring(0, length)
  },

  ensureSecureImageRequest: function (src) {
    if (src && src.indexOf('//') > 0) src = 'https://' + src.split('//')[1]
    return src
  }

}
