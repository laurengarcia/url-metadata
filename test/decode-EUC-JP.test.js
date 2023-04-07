// Test dedoding Japanese EUC-JP encoded metadata.

const urlMetadata = require('./../index')
const detectCharacterEncoding = require('detect-character-encoding')
const iconv = require('iconv-lite')


test('decode option: handle EUC-JP encoding', async () => {

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

  try {
    const metadata = await urlMetadata(url, options)
    expect(metadata.url).toBe(url)
  } catch(err) {
    expect(error).toBe(undefined)
  }
})

