# CHANGELOG

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
