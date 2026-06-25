import { fetchMetadata } from './fetch';

const metadata = await fetchMetadata('https://minifetch.com');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  if (!metadata) {
    return (
      <body>
        {children}
      </body>
    );
  }

  return (
    <html lang="en">
      <body>
      {children}
      <p>Complete: <br />
        metadata fetched from server</p>
      <p>
        Request url: <br />
        {metadata.requestUrl}
      </p>
      <p>
        Title: <br />
        {metadata.title}
      </p>
      <p>
        Description: <br />
        {metadata.description}
      </p>
      </body>
    </html>
  )
}
