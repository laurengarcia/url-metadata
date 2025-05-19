const urlMetadata = require('./../index')

// NOTE: we may need to start to just mocking the responses here
// as more and more sites convert to UTF-8

// header: 'Content-Type': 'text/html; charset=EUC-JP'
test('EUC-JP charset auto-detected from `Content-Type` header', async () => {
  const url = 'https://irobot.csse.muroran-it.ac.jp/'
  const title = '認知ロボティクス研究室 - iRobotLab'
  try {
    const metadata = await urlMetadata(url)
    // Test decoding:
    expect(metadata.title).toContain(title)
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

// ex: ＜META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=EUC-JP"＞
test('EUC-JP charset auto-detected in meta tag', async () => {
  const url = 'https://plaza.umin.ac.jp/GHDNet/97/h904wnn.html'
  const title = 'h904wnn'
  try {
    const metadata = await urlMetadata(url)
    // Test decoding:
    expect(metadata.title).toContain(title)
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

// ex: <meta charset="windows-1251">
test('charset=windows-1251 (Cyrillic) auto-detected in meta tag', async () => {
  const url = 'https://forum.ru-board.com/'
  const title = 'Компьютерный форум Ru.Board'
  try {
    const metadata = await urlMetadata(url)
    // If this breaks, it means the test is broken & we need a diff example url:
    expect(metadata['Content-Type']).toBe('text/html; charset=windows-1251')
    // Test decoding:
    expect(metadata.title).toBe(title)
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('User-specified opts.decode=windows-1251 (Cyrillic)', async () => {
  const url = 'https://forum.ru-board.com/'
  const title = 'Компьютерный форум Ru.Board'
  try {
    const metadata = await urlMetadata(url, { decode: 'windows-1251' })
    // If this breaks, it means the test is broken & we need a diff example url
    expect(metadata['Content-Type']).toBe('text/html; charset=windows-1251')
    // Test decoding:
    expect(metadata.title).toBe(title)
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('throws error with bad opts.decode', async () => {
  const url = 'https://www.npmjs.com/package/url-metadata'
  try {
    const metadata = await urlMetadata(url, { decode: 'FOO-BAR' })
    // shouldn't get here but just in case
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err).toBeDefined()
  }
})
