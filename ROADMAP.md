3.0 Roadmap

[X] remove package-lock.json
[X] remove deprecated sourceMap option
[X] audit deps for licensing issues
[X] update all deps
[X] remove deps: `request`, `q`, etc libs
    - [X] ensure native fetch is used with correct version of node 18
          ex: https://github.com/jonbern/fetch-retry/blob/master/index.js
    - [X] convert to async/ await syntax
[X] review all open issues, fix & add /test where appropriate
    - [X] add option to return url body that is scraped
    - [X] add customHeaders option
    - [X] `twitter:description`, `twitter:url` missing
    - [X] set package.json `types` prop to `index.d.ts`

[X] add test framework to examples
[X] break out example/decode.js japanese decoding into own file
[X] simplify index.d.ts
[X] husky pre-commit hook runs linter, tests example code
[X] add template for issues that includes steps to reproduce bugs

[ ] return og: music, audio, video tags
[ ] add github actions that run test library automatically
