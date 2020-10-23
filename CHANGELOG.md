# CHANGELOG

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
