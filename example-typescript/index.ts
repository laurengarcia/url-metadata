import urlMetadata from 'url-metadata';

(async function () {
  console.log('-- running 2 tests ---');
  try {
    const metadata = await urlMetadata('./metadata.html', {
      mode: 'same-origin',
      includeResponseBody: true
    });
    console.log('1/ fetch local metadata.html:', metadata);
  } catch (err) {
    const e = err as urlMetadata.UrlMetadataError;
    console.error(`Failed to fetch metadata:`, e.message, e.statusCode, e.redirects);
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
    // falsy `url` param (null here, but also '' or undefined) + response
    // object as option triggers parse mode; all falsy urls coerce to
    // `metadata.requestUrl === null` (v5.7.5+)
    const metadata = await urlMetadata(null, { parseResponseObject: response });
    console.log('2/ parse html string:', metadata);
  } catch (err) {
    const e = err as urlMetadata.UrlMetadataError;
    console.error(`Fail:`, e.message);
  }
})();

// --- COMPILE-ONLY canary: never called, checked by ts-loader on every build ---
// Encodes the backward-compat guarantee that `Result` stays loose (any-like).
// If this function stops compiling, index.d.ts has narrowed `Result` and will
// break existing codebases in the wild. Runtime-unsound on purpose: DO NOT CALL.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function resultStaysPermissiveCanary (url: string) {
  const meta: urlMetadata.Result = await urlMetadata(url);

  // unsound reads must compile (reads are `any`)
  meta.title.forEach((x: unknown) => x); // string at runtime
  meta.favicons.href; // array at runtime
  const s: string = meta.responseStatusCode; // number at runtime

  // arbitrary meta tags, zero ceremony
  meta['dc.creator'].toLowerCase();
  meta.foobar.whatever.deeply.nested;

  // partial mocks assignable to Result (common test-suite pattern in the wild)
  const mock: urlMetadata.Result = { title: 'x' };

  // opt-in tiers: known fields resolve to real types, extras fall thru to any
  const known = meta as urlMetadata.KnownFields;
  const title: string = known.title;
  const favs: urlMetadata.FaviconTag[] = known.favicons;
  const hops: urlMetadata.RedirectHop[] = known.redirects.chain;
  const req: string | null = known.requestUrl;
  const extra = known['dc.creator']; // any

  return [s, mock, titleX, favs, hops, req, extra];
}
