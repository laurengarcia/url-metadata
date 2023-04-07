const urlMetadata = require('./../index')

test('retrieves robots meta directives', () => {

  return urlMetadata('https://moz.com/learn/seo/robots-meta-directives').then(
    function (metadata) {
      expect(metadata.robots).toBe('all');
    },
    function (error) {
      expect(error).toBe(undefined)
    }
  )
})
