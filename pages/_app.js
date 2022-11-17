import Head from 'next/head';
import { useAmp } from 'next/amp';

import AMPCSS from '../components/AMPCSS';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const isAmp = useAmp();

  return (
    <>
    <Head>
      <meta name="robots" content="noindex" />
      {isAmp ? (
        <AMPCSS />
      ) : null}
    </Head>
    <Component {...pageProps} />
    </>
  );
}

export default MyApp;
