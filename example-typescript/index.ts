import urlMetadata from 'url-metadata';

(async function () {
  console.log('-- running 2 tests ---')
  try {
    const metadata = await urlMetadata('./metadata.html', {
      mode: 'same-origin',
      includeResponseBody: true
    });
    console.log('1/ fetch local metadata.html:', metadata);
  } catch(error) {
    const err = error as urlMetadata.UrlMetadataError;
    console.log(err)
  }
})();

(async function () {
  try {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Metadata page</title>
        <meta name="author" content="foobar">
        <meta name="keywords" content="HTML, CSS, JavaScript">
      </head>
      <body>
        <h1>Metadata page</h1>
      </body>
    </html>
    `
    const response = new Response(html, {
      headers: {
        'Content-Type': 'text/html'
      }
    })
    // pass null `url` param & response object as option
    const metadata = await urlMetadata(null, { parseResponseObject: response })
    console.log('2/ parse html string:', metadata);
  } catch(error) {
    const err = error as urlMetadata.UrlMetadataError;
    console.log(err);
  }
})();
