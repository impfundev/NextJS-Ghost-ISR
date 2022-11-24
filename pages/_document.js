import { Html, Head, Main, NextScript } from 'next/document';
import { useAmp } from 'next/amp';
import ampify from 'ampify';

export default function Document() {
  const isAmp = useAmp();
  const rawHtml = `<Html lang="id">
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>`;
  const amp = ampify(html, {
    cwd: 'amp',
    canonicalURL: 'https://fandomnesia.vercel.app',
  });

  return (
    <>
      {isAmp ? (
        <>
          { amp }
        </>
      ) : (
      <Html lang="id">
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
      )}
    </>
  )
}
