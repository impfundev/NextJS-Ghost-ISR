import Head from "next/head";

import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Fandomnesia</title>
      </Head>
      <Header />
      <main className="container mx-auto px-5">{children}</main>
    </>
  );
}
