import Head from 'next/head';
import { Rubik } from '@next/font/google';
import '../styles/globals.css';

  const rubik = Rubik({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--rubik-font',
  });

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <meta name="robots" content="noindex" />
    </Head>
    <Component {...pageProps} className={rubik.variable} />
    </>
  );
}

export default MyApp;
