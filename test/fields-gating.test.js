// Extractor gating is a pure performance optimization: an extractor runs only
// when its output is selected. These tests assert control flow (which
// extractors run), so the extractor modules are mocked. Output correctness
// under gating is covered by fields-groups.test.js against the real modules.

jest.mock('../lib/extract-json-ld', () => jest.fn(() => []))
jest.mock('../lib/extract-headings', () => jest.fn(() => []))
jest.mock('../lib/extract-img-tags', () => jest.fn(() => []))
jest.mock('../lib/extract-meta-tags', () => jest.fn(() => ({})))

const extractJsonLd = require('../lib/extract-json-ld')
const extractHeadings = require('../lib/extract-headings')
const extractImgTags = require('../lib/extract-img-tags')
const extractMetaTags = require('../lib/extract-meta-tags')
const urlMetadata = require('../index')

const html = '<!DOCTYPE html><html lang="en"><head><title>T</title></head><body><h1>Hi</h1></body></html>'
function res () {
  return new Response(html, { headers: { 'Content-Type': 'text/html' } })
}

beforeEach(() => {
  extractJsonLd.mockClear()
  extractHeadings.mockClear()
  extractImgTags.mockClear()
  extractMetaTags.mockClear()
})

test('gating: skips all expensive extractors for a non-matching selection', async () => {
  await urlMetadata(null, { parseResponseObject: res(), fields: ['title'] })
  expect(extractJsonLd).not.toHaveBeenCalled()
  expect(extractHeadings).not.toHaveBeenCalled()
  expect(extractImgTags).not.toHaveBeenCalled()
  expect(extractMetaTags).not.toHaveBeenCalled()
})

test('gating: runs only jsonld when jsonld is selected', async () => {
  await urlMetadata(null, { parseResponseObject: res(), fields: ['jsonld'] })
  expect(extractJsonLd).toHaveBeenCalledTimes(1)
  expect(extractHeadings).not.toHaveBeenCalled()
  expect(extractImgTags).not.toHaveBeenCalled()
  expect(extractMetaTags).not.toHaveBeenCalled()
})

test('gating: og group runs the meta-tag extractor only', async () => {
  await urlMetadata(null, { parseResponseObject: res(), fields: ['og'] })
  expect(extractMetaTags).toHaveBeenCalledTimes(1)
  expect(extractJsonLd).not.toHaveBeenCalled()
})

test('gating: `meta` group runs the meta-tag extractor', async () => {
  await urlMetadata(null, { parseResponseObject: res(), fields: ['meta'] })
  expect(extractMetaTags).toHaveBeenCalledTimes(1)
})

test('gating: an atomic meta key (description) runs the meta-tag extractor', async () => {
  await urlMetadata(null, { parseResponseObject: res(), fields: ['description'] })
  expect(extractMetaTags).toHaveBeenCalledTimes(1)
  expect(extractJsonLd).not.toHaveBeenCalled()
})

test('gating: no `fields` runs every extractor (full output)', async () => {
  await urlMetadata(null, { parseResponseObject: res() })
  expect(extractJsonLd).toHaveBeenCalledTimes(1)
  expect(extractHeadings).toHaveBeenCalledTimes(1)
  expect(extractImgTags).toHaveBeenCalledTimes(1)
  expect(extractMetaTags).toHaveBeenCalledTimes(1)
})
