// Here we are decoding Japanese EUC-JP encoded metadata.

const urlMetadata = require('./../index')
const detectCharacterEncoding = require('detect-character-encoding')
const iconv = require('iconv-lite')


test('decode option: handle EUC-JP encoding', () => {

  const url = 'http://charset.7jp.net/euc.html';

  const options = {
    decode: function (buf) {
      expect(Buffer.isBuffer(buf)).toBe(true)

      const result = detectCharacterEncoding(buf)
      if (!result) {
        return ''
      }
      const encoding = result.encoding
      expect(encoding).toBe('EUC-JP')

      if (encoding === 'UTF-8') {
        return buf.toString()
      }

      if (!iconv.encodingExists(encoding)) {
        return ''
      }

      return iconv.decode(buf, encoding)
    }
  }

  return urlMetadata(url, options).then(
    function (metadata) {
      expect(metadata.url).toBe(url)
    },
    function (error) {
      expect(error).toBe(undefined)
    }
  )
})

