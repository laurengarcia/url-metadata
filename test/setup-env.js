// Loads .env-test into process.env before the test suite runs.
// Wired in via jest's `setupFiles` in package.json.
require('dotenv').config({ path: '.env-test' })
