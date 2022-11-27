import "../styles/globals.css";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";

function MyApp({ Component, pageProps }, context) {
  const apolloClient = useApollo(pageProps);

  return (
    <>
    <ApolloProvider client={apolloClient}>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
    </>
  );
}

export default MyApp;
