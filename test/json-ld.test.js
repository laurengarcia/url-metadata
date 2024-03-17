const urlMetadata = require('./../index')

test('retrieves json-ld if url has it', async () => {
  const url = 'https://www.coindesk.com/twitter-systemically-important-financial-regulators'
  try {
    const metadata = await urlMetadata(url)
    expect(typeof metadata.jsonld[0]).toBe('object')
    expect(typeof metadata.jsonld[0].headline).toBe('string')
    expect(typeof metadata.jsonld[0].datePublished).toBe('string')
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('retrieves multiple json-ld objects', async () => {
  const url = 'https://goout.net/cs/metronome-prague-2024/szpsfuw/'
  const metadata = await urlMetadata(url)
  expect(metadata.jsonld.length).toBe(2)
  expect(metadata.jsonld[0]['@type']).toBe('Event')
  expect(metadata.jsonld[1]['@type']).toBe('BreadcrumbList')
})

test('retrieves multiple json-ld objects using @graph syntax', async () => {
  // example taken from
  // https://www.youku.tv/v_nextstage/id_decaa6fcde074a59aa21.html
  // note that the original example url has a syntax error & doesn't parse properly
  // so we extracted it into `const html`, removed the syntax error &
  // test it without the error below:
  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Metadata page</title>
      <meta name="author" content="foobar">
      <meta name="keywords" content="HTML, CSS, JavaScript">
    <script type="application/ld+json" crossorigin="anonymous">
      {
        "@context": "http://schema.org",
        "@type": "Organization",
        "url": "https://youku.tv",
        "logo": "https://img.alicdn.com/tfs/TB17DTuXkH0gK0jSZPiXXavapXa-680-133.svg"
      }
    </script>
    <script type="application/ld+json" crossorigin="anonymous">
      {
        "@context": "http://schema.org",
        "@graph": [{
          "@type":"VideoObject",
          "description":"Watch online Vụng Trộm Không Thể GiấuVụng Trộm Không Thể Giấu 01-Watch online-YOUKU Synopsis:Vụng Trộm Không Thể Giấu 01",
          "name":"Vụng Trộm Không Thể GiấuVụng Trộm Không Thể Giấu 01-Watch online-YOUKU",
          "thumbnailUrl":"https://m.ykimg.com/054201016491597B36596ED57E14B12B",
          "uploadDate":"2023-06-20 17:29:59"
        }, {
          "@type":"TVSeries",
          "description": "Trong những năm tháng cấp 3, Tang Trĩ liên tục bị mời phụ huynh lên nói chuyện, để giải quyết rắc rối, Tang Trĩ quyết định nhờ anh trai đi họp thay, nhưng hai anh em vừa gặp mặt thì không ngừng cãi vã, bất đắc dĩ Tang Trĩ đành phải nhờ Đoàn Gia Hứa - bạn cùng phòng của anh trai thường hay tới nhà mình chơi. Đứng trước sự van nài và uy hiếp của Tang Trĩ, Đoàn Gia Hứa giúp Tang Trĩ tới trường gặp giáo viên, từ đó hai người kết duyên, Đoàn Gia Hứa bảo vệ và thương yêu Tang Trĩ như em gái ruột. Sau đó Đoàn Gia Hứa tốt nghiệp đại học, hai người chia cách hai nơi, lại vì một số hiểu lầm, quan hệ dần trở nên xa cách. Năm tháng dần trôi, Tang Trĩ nay đã lớn và thi đỗ vào trường ở thành phố mà Đoàn Gia Hứa sinh sống như đúng nguyện vọng của mình, hai người gặp lại. Sau khi tiếp xúc và gần gũi nhau hơn,Tang Trĩ dần phát hiện nguyên nhân áp lực từ trước tới nay của Đoàn Gia Hứa, cô muốn bảo vệ người anh trai luôn yêu thương bảo bọc mình, tìm lại tình yêu thầm kín giấu sâu trong đáy lòng. Có Tang Trĩ bên cạnh, Đoàn Gia Hứa dần cởi bỏ được khúc mắc trong lòng, anh thật lòng rung động trước một Tang Trĩ trưởng thành, chuyện tình tương tư thầm thương trộm nhớ cuối cùng cũng đã nở hoa rực rỡ.",
          "name": "Vụng Trộm Không Thể GiấuVụng Trộm Không Thể Giấu 01-Watch online-YOUKU"
        }]
      }
    </script>
    </head>
    <body>
      <h1>Metadata page</h1>
    </body>
  </html>
  `
  const response = new Response(html, {
    headers: {
      'Content-Type': 'text/html'
    }
  })

  try {
    const metadata = await urlMetadata(null, { parseResponseObject: response })
    expect(metadata.jsonld.length).toBe(3)
    expect(metadata.jsonld[0]['@type']).toBe('Organization')
    expect(metadata.jsonld[1]['@type']).toBe('VideoObject')
    expect(metadata.jsonld[2]['@type']).toBe('TVSeries')
  } catch (e) {
    expect(e).toBe(undefined)
  }
})
