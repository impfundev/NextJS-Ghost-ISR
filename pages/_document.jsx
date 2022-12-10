import { Html, Head, Main, NextScript } from 'next/document'
import { siteUrl } from "../lib/config";

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        <NextSeo
          noindex={true}
          nofollow={true}
          robotsProps={{
            maxImagePreview: 'large',
          }}
          additionalLinkTags={[
            {
              rel: 'apple-touch-icon',
              href: `${siteUrl}/favicon.png`,
              sizes: '150x150'
            },
            {
              type: 'application/rss+xml',
              rel: 'alternate',
              title: 'Fandomnesia',
              href: `${siteUrl}/feed`
            },
          ]}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
