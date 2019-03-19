const urlMetadata = require('./../index')

const options = {
  sourceMap: { 'the guardian': 'theguardian.com' }
}
urlMetadata('https://www.youtube.com/watch?v=qVg0iruZUGs', options).then(
  function (metadata) { // success callback
    // result:
    // notice the metadata's source field --
    // the youtube username `The Guardian` is mapped into
    // the `source` metadata field as 'theguardian.com'
    console.log(metadata)
  },
  function (error) { // failure callback
    console.log(error)
  })
