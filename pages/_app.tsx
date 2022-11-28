import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

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
