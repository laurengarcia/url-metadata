
// First, try extracting charset from response.headers.get('content-type')
// Per spec, header should take precedent

// If none found, try extracting charset from meta tag
// ex: <meta http-equiv="Content-Type" content="text/html; charset=windows-1251" />
