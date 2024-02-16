import urlMetadata from 'url-metadata';

(async function () {
  try {
    const metadata = await urlMetadata('./metadata.html', {
      mode: 'same-origin',
      includeResponseBody: true
    });
    console.log('1/ metadata.html:', metadata);
  } catch(err) {
    console.log(err);
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

    console.log('2/ html string:', metadata);
  } catch(err) {
    console.log(err);
  }
})();
