var urlMetadata = require('./../index.js');

urlMetadata('./metadata.html', {
  mode: 'same-origin',
  includeResponseBody: true
})
  .then((metadata) => {
    console.log('fetched metadata:')
    console.log(metadata)
    // do stuff with the metadata
  },
  (err) => {
    console.log(err)
  })
