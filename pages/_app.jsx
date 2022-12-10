import { Rubik } from "@next/font/google";
import { NextSeo } from "next-seo";
import { siteUrl } from "../lib/config";
import "../styles/globals.css";

const rubik = Rubik({ subsets: ['latin'] });

function MyApp({ Component, pageProps }) {
  
  return (
    <>
        <NextSeo
          noindex={true}
          nofollow={true}
          robotsProps={{
            maxImagePreview: 'large',
          }}
          additionalLinkTags={[
            {
              rel: 'shortcut icon',
              href: `/favicon.ico`,
            },
            {
              rel: 'apple-touch-icon',
              href: '/favicon.png`,
              sizes: '150x150'
            },
            {
              rel: 'apple-touch-icon-precomposed',
              href: '/favicon.png`,
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
      <style jsx global>{`
        html {
          font-family: ${rubik.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
