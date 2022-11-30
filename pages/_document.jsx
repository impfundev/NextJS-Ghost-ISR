import { Html, Head, Main, NextScript } from 'next/document'
import { siteUrl } from "../lib/config";

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        <link type="application/rss+xml" rel="alternate" title="Fandomnesia" href={`${siteUrl}/feed.xml`} />
        <meta name="robots" content="noindex" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
