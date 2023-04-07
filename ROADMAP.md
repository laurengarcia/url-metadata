3.0 Roadmap

[X] remove package-lock.json
[X] remove deprecated sourceMap option
[ ] audit deps for licensing issues
[ ] update all deps
[ ] remove deps: `request`, `q`, `underscore` libs
      - ensure native fetch is used with correct version of node(18? 16.15.0?)
      - convert to async/ await syntax
      ex: https://github.com/jonbern/fetch-retry/blob/master/index.js
[ ] review all open issues, fix & add /example where appropriate
[ ] add option to return full dom tree that is scraped

[X] add test framework to examples
[X] break out example/decode.js japanese decoding into own file
[ ] examples cover both browser and node.js
[ ] export new index.d.ts using `rollup -c`
[ ] examples cover typescript
[ ] set package.json `types` prop to `index.d.ts`
[ ] husky pre-commit hook runs linter, tests example code

[ ] add template for issues that includes steps to reproduce bugs
[ ] add github actions that test library automatically
[ ] add github actions that auto-publish npm updates from merged PRs
[ ] add github actions that auto-publish changelog from merged PRs
