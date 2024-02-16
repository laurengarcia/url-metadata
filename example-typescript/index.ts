import urlMetadata from 'url-metadata';

(async function () {
  try {
    const metadata = await urlMetadata('./metadata.html', {
      mode: 'same-origin',
      includeResponseBody: true
    });
    console.log('fetched ./metadata.html:', metadata);
  } catch(err) {
    console.log(err);
  }
})();
