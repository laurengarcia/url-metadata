# CHANGELOG

5.4.0
- x402: special handling of 402 "payment required" response errors per the [x402](https://www.x402.org/) spec

5.3.0
- feature: add support for extracting `hreflang`
- update README
- bugfix: option `ensureSecureImageRequest`, with tests
- add more meta tag types to the default metadata object template (see lib/metadata-fields.js). this does not change the metadata returned from this package at all, its more an aesthetic change to the data object since these fields would be included either way but they would be found at the "bottom" of the object before this change.

5.2.3
- main.js: simplify contentType header rejection conditions
- update tests
- README change

5.2.2
- add og:image:alt to metadata returned
- issue #103: improve Next.js support, add /example-nextjs directory
- improve error messaging if fetch is undefined (browser vs node.js)

5.2.1
- just README changes

5.2.0
- add `agent` option for Node v6+

5.1.1
- return relevant `responseHeaders` with metadata (see `lib/extract-headers.js`)
- improve package.json browser bundling support

5.1.0
- separate entry points for browser and node.js for more efficient bundling (see package.json) & SSRF support
- switch to `node-fetch` v2 on node.js side to support proper SSRF filtering
- add `options.compress` from `node-fetch` to our node.js user options
- add `options.size` to set a max size for the response in Node.js envs
- added npm url to the default `User-Agent` header
- improve cleanup of memory leaks when a fetch attempt errors out
- switch `/example-typescript` to webpack (vs. parcel)
- update both /example- dirs to use the 5.1.0, ensure build works as expected

5.0.5
- add `/example-vite` directory (per issue #99)

5.0.4
- bugfix issue #99: conditional useAgent for vite (browser) builds & Node.js < v18

5.0.3
- improve README & readability UX

5.0.2
- README: clarfiy support for SSRF prevention/ Node.js versioning
- update default request headers `User-Agent` string

5.0.1
- in `/example-typescript`: update `parcel` version in `devDependencies`

5.0.0
- issue #97: prevent SSRF attacks
- issue #97: add `maxRedirects` option to prevent infinite redirect loops

4.1.4
- bugfix issue #90: ignore meta tags outside of <head> tag

4.1.3
- issue #90: temporarily remove support for itemprop meta

4.1.2
- update/fix failing tests

4.1.1
- support favicons rel='shortcut icon'

4.1.0
- support json-ld `@graph` syntax

4.0.1
- update `/example-typescript` to use version 4.0.0

4.0.0
- bugfix: allow multiple json-ld objects. this is a breaking change, previous versions returned `jsonld` as a single object but is now an array of objects.

3.5.6
- update typescript def so `url` param can be `null` when in `parseResponseObject` option mode
- add this mode to /example-typescript

3.5.5
- update example browser usage dir /example-typescript to use parcel instead of browserify
- README changes

3.5.4
- add new test for parsing from string to /test/options.test.js
- add as new test as example to README

3.5.3
- bug: missing option `parseResponseObject` from Typescript definition
- add Checklist to PR template so this doesn't happen again

3.5.2
- README changes only

3.5.1
- README changes only

3.5.0
- new option: parseResponseObject
- bug: 'unsupported content type' errors hang

3.4.9
- bugs with `ensureSecureImageRequest` opt `true`
  - favicons not obeying opt when scheme is missing ex: '//:'
  - handle img tags w `data:` URIs

3.4.8
- improve favicon support & tests

3.4.7
- return imgTags on page (obey `ensureSecureImageRequest` opt)
- bug: update TS `Result` definition to fit complex/varied json-ld use-cases in wild
- change from 3.4.4: `heading.content` -> `heading.text`

3.4.6
- return `requestUrl` (the url the user passed in to this module) alongside `url`, the final hop in request chain

3.4.5
- handle multiple meta tags with same key, diff values by concatenating & comma-delimiting in one string
- bug: fix meta tag charset
- headings: strip newlines and extra spaces

3.4.4
- h1-h6 headings

3.4.3
- tighten up regex in extract-charset.js

3.4.2
- return lang attribute

3.4.1
- README, keyword changes

3.4.0
- opts.decode defaults to auto-detecting charset & supports user-specificed charset overrides

3.3.1
- add troubleshooting section to README

3.3.0
- citations handling & tests, explainer in README

3.2.0
- fix title bug

3.1.1
- update Typescript definitions index.d.ts to account for favicons

3.1.0
- scrape favicon(s) & add test

3.0.3
- test: add test for `descriptionLength` option

3.0.1
- bug: missing option from index.d.ts

3.0
- replace `request`, `q` modules with js-native `fetch` and async/await
- update dependencies
- add test suite

2.5
- add support for JSON-LD https://moz.com/blog/json-ld-for-beginners

2.4
- Typescript definitions index.d.ts

2.3
- options.decode() to handle custom encodings:
  https://github.com/LevelNewsOrg/url-metadata/pull/14
- example/decode.js sample decode() for EUC-JP (Japanese)

2.2.3
- handle mixed case in options.sourceMap keys

2.2.2
- fix YouTube source mapping by updating the DOM selector it is derived from
- better sourceMap example in README

2.2.1
- update to linter to [standard](https://www.npmjs.com/package/standard) 12.0.1

2.2.0
- add support for metatags: `price`, `pricecurrency`, `availability`
- add support for metatags with attribute `itemprop`, in addition to `property`

2.1.9
- bugfix: truncated `og:image` (issue #9)

2.1.8
- bugfix: bad responses neither rejecting nor resolving

2.1.7
- README typo in usage instructions

2.1.6
- add keywords to package.json

2.1.5
- make options usage more explicit in README
