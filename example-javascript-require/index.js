const urlMetadata = require('url-metadata');

(async function () {
  try {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Example Metadata Page</title>
        <meta name="author" content="foobar">
        <meta name="keywords" content="HTML, CSS, JavaScript">
      </head>
      <body>
        <h1>Metadata page header 1</h1>
      </body>
    </html>
    `
    const response = new Response(html, {
      headers: {
        'Content-Type': 'text/html'
      }
    })
    // pass null `url` param & response object as option
    const metadata = await urlMetadata(null, { parseResponseObject: response });
    console.log('parse html string:', metadata);
  } catch (err) {
    console.error(err);
  }
})();
