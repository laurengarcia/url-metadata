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
  const req: string | null | undefined = known.requestUrl; // optional field, echoes url param verbatim
  const extra = known['dc.creator']; // any

  return [s, mock, title, favs, hops, req, extra];
}

// --- COMPILE-ONLY canary: sparse return-type overloads. Never called. ---
// Locks the guarantee that `fields` (any selection) and `omitEmpty: true`
// narrow the result to Partial<KnownFields> (known fields optional & real-
// typed), while `omitEmpty: false` and no selection stay the loose `Result`.
// Relies on strictNullChecks (tsconfig `strict: true`). DO NOT CALL.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function sparseReturnTypeCanary (url: string) {
  // `fields` present -> Partial<KnownFields>
  const picked = await urlMetadata(url, { fields: ['title'] });
  const okPicked: Partial<urlMetadata.KnownFields> = picked; // assignable
  // @ts-expect-error Partial (optional fields) is NOT assignable to the all-present Strict shape
  const strictPicked: urlMetadata.KnownFieldsStrict = picked;

  // `omitEmpty: true` -> Partial<KnownFields>
  const pruned = await urlMetadata(url, { omitEmpty: true });
  const okPruned: Partial<urlMetadata.KnownFields> = pruned;
  // @ts-expect-error Partial is NOT assignable to Strict
  const strictPruned: urlMetadata.KnownFieldsStrict = pruned;

  // `omitEmpty: false` -> loose `Result` (known keys resolve to `any`)
  const full = await urlMetadata(url, { omitEmpty: false });
  const okFull: urlMetadata.Result = full;
  full.responseStatusCode.whatever; // any: compiles; would error under Partial

  // no `fields`/`omitEmpty` -> `Result`
  const plain = await urlMetadata(url, { descriptionLength: 500 });
  const okPlain: urlMetadata.Result = plain;

  return [okPicked, strictPicked, okPruned, strictPruned, okFull, okPlain];
}
