const urlMetadata = require('./../index.js');

(async function () {
  try {
    const metadata = await urlMetadata('./metadata.html', {
      mode: 'same-origin',
      includeResponseBody: true
    });
    console.log('fetched ./metadata.html:', metadata)
  } catch(err) {
    console.log('fetch error:', err);
  }
})();
