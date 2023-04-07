3.0 Roadmap

[X] remove package-lock.json
[X] remove deprecated sourceMap option
[X] audit deps for licensing issues
[X] update all deps
[X] remove deps: `request`, `q`, etc libs
      - [X] ensure native fetch is used with correct version of node 18
          ex: https://github.com/jonbern/fetch-retry/blob/master/index.js
      - [X] convert to async/ await syntax
[ ] review all open issues, fix & add /test where appropriate
    - [X] add option to return url body that is scraped
    - [ ] add customHeaders option
[ ] return language field

[X] add test framework to examples
[X] break out example/decode.js japanese decoding into own file
[ ] set package.json `types` prop to `index.d.ts`
[ ] husky pre-commit hook runs linter, tests example code

[ ] add template for issues that includes steps to reproduce bugs
[ ] add github actions that test library automatically
[ ] add github actions that auto-publish npm updates from merged PRs
[ ] add github actions that auto-publish changelog from merged PRs
