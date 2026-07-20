// Loads .env-test into process.env before the test suite runs.
// Wired in via jest's `setupFiles` in package.json.
// `quiet: true` suppresses dotenv's own runtime log
require('dotenv').config({ path: '.env-test', quiet: true })
