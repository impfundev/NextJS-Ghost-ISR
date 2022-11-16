import Head from "next/head";

import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Fandomnesia</title>
      </Head>
      <Header />
      <main className="container mx-auto px-5">
        {children}
      </main>
<footer className="bg-gray-900">
    <div className="grid grid-cols-2 gap-8 py-8 px-6 md:grid-cols-4">
        <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-400">Situs</h2>
            <ul className="text-gray-400">
                <li className="mb-4">
                    <a href="#" className="hover:underline">Tentang Kami</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Kontak Kami</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-400">Channel</h2>
            <ul className="text-gray-400">
                <li className="mb-4">
                    <a href="#" className="hover:underline">YouTube</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Twitter</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Facebook</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Google News</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-400">Legal</h2>
            <ul className="text-gray-400">
                <li className="mb-4">
                    <a href="#" className="hover:underline">Disclaimer</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Kebijakan Privasi</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Pedoman Media Siber</a>
                </li>
            </ul>
        </div>
    </div>
    <div className="py-6 px-4 bg-gray-700 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-300 sm:text-center">© 2022 <a href="/">Fandomnesia</a>. All Rights Reserved.
        </span>
    </div>
</footer>
    </>
  );
}
