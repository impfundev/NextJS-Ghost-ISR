import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <meta name="robots" content="noindex" />
    </Head>
    <Component {...pageProps} />
    </>
  );
}

export default MyApp;
