module.exports = {

  cleanTitleString: function (value) {
    if (typeof value !== 'string') return value
    // remove any newline characters, replace with space:
    value = value.replace(/\n|\r/gm, ' ')
    // remove double (or more) spaces, replace with single space:
    value = value.replace(/( {2,})/gm, ' ')
    return value
  },

  truncate: function (value, length) {
    if (typeof value !== 'string') return ''
    if (value.length <= length) return value
    return value.substring(0, length)
  },

  ensureSecureImageRequest: function (src) {
    if (src && src.indexOf('//') > 0) {
      const arr = src.split('//')
      arr[0] = 'https:'
      src = arr.join('//')
    }
    return src
  }

}
