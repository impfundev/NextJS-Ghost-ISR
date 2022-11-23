import Head from 'next/head';
import { Rubik } from '@next/font/google';
import '../styles/globals.css';

const rubik = Rubik({
  display: 'swap',
  weight: ['400','700'],
  fallback: 'sans-serif',
  variable: '--rubik-font',
})

function MyApp({ Component, pageProps, rubik }) {

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
