const urlMetadata = require('./../index')

test('basic example', () => {
  const url = 'https://www.npmjs.com/package/url-metadata';
  return urlMetadata(url).then(metadata => {
    expect(metadata.url).toBe(url);
  })
})
