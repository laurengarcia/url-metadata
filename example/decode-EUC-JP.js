// Here we are decoding Japanese EUC-JP encoded metadata.

const urlMetadata = require('./../index')
const detectCharacterEncoding = require('detect-character-encoding')
const iconv = require('iconv-lite')

const options = {
  decode: function (buf) {
    console.log(`isBuffer() should be true: ${Buffer.isBuffer(buf)}`)

    const result = detectCharacterEncoding(buf)
    if (!result) {
      return ''
    }
    const encoding = result.encoding
    console.log(`encoding: ${encoding}`)
    if (encoding === 'UTF-8') {
      return buf.toString()
    }
    if (!iconv.encodingExists(encoding)) {
      return ''
    }
    console.log('return iconv.decode');
    return iconv.decode(buf, encoding)
  }
}

urlMetadata('http://charset.7jp.net/euc.html', options).then(
  function (metadata) {
    console.log(metadata)
  },
  function (error) {
    console.log(error)
  })
