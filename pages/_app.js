import Head from 'next/head';
import { Rubik } from '@next/font/google';
import '../styles/globals.css';

function MyApp({ Component, pageProps, Rubik }) {
  const rubik = Rubik({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--rubik-font',
  }) { return rubik.variable };

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
