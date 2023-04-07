const urlMetadata = require('./../index')

test('retrieves json-ld if url has it', () => {

  return urlMetadata('https://www.coindesk.com/twitter-systemically-important-financial-regulators').then(
    function (metadata) {
      expect(typeof metadata.jsonld).toBe('object')
      expect(typeof metadata.jsonld.headline).toBe('string')
      expect(typeof metadata.jsonld.datePublished).toBe('string')
    },
    function (error) {
      expect(error).toBe(undefined)
    }
  )
})
