# Check one:
- [ ] I am reporting a bug.
- [ ] I am requesting a feature.

### Steps to reproduce (if bug):
1.
2.

### Feature request:
Describe the feature you would like here.
Please attach screenshots here if helpful.
___

### Contributors checklist:
- [ ] update README (if applicable)
- [ ] update CHANGELOG (if applicable)
- [ ] update ROADMAP (if applicable)
- [ ] index.d.ts: ensure parameters, options & Result are still correct
- [ ] `npm run test`
- [ ] ensure ts example works in /example-typescript: `npm run start`

### Maintainers checklist:
- [ ] `npm run test` on the new PR branch
- [ ] ensure ts example works in /example-typescript: `npm run start`
- [ ] package.json: bump semver version, push commit to new PR branch on origin
- [ ] `squash and merge` PR to master
- [ ] git tag new version of master
        `$ git pull origin master`
        `$ npm run test`
        `$ git tag 1.0`
        `$ git push origin 1.0`
- [ ] `npm publish ./`
