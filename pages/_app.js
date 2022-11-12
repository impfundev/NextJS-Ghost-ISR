import { ApolloProvider } from "@apollo/client/react";
import Head from 'next/head'
import { client } from "../lib/apolloClient";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <meta name="robots" content="noindex" />
    </Head>
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
    </>
  );
}

export default MyApp;
