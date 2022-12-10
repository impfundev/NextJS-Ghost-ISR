import { Rubik } from "@next/font/google";
import { NextSeo } from "next-seo";
import { Html, Head, Main, NextScript } from 'next/document'
import { siteUrl } from "../lib/config";

const rubik = Rubik({ subsets: ['latin'] });

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
              rel: 'icon',
              href: `${siteUrl}/favicon.png`,
            },
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
      <body className={rubik.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
