import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="container mx-auto px-5 pb-8">
        {children}
      </main>
<footer className="bg-yellow-200 border-t border-black">
    <div className="grid grid-cols-2 gap-8 py-8 px-6 md:grid-cols-4">
        <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-500">Situs</h2>
            <ul>
                <li className="mb-4">
                    <a href="/tentang-kami/" className="hover:font-bold transition-all duration-300">Tentang Kami</a>
                </li>
                <li className="mb-4">
                    <a href="/tentang-kami/" className="hover:font-bold transition-all duration-300">Kontak Kami</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-500">Channel</h2>
            <ul>
                <li className="mb-4">
                    <a href="#" className="hover:font-bold transition-all duration-300">YouTube</a>
                </li>
                <li className="mb-4">
                    <a href="https://twitter.com/fandomnesia_com" className="hover:font-bold transition-all duration-300">Twitter</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:font-bold transition-all duration-300">Facebook</a>
                </li>
                <li className="mb-4">
                    <a href="https://news.google.com/publications/CAAqBwgKMK2zowsw8L27Aw" className="hover:font-bold transition-all duration-300">Google News</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-500">Legal</h2>
            <ul>
                <li className="mb-4">
                    <a href="/disclaimer/" className="hover:font-bold transition-all duration-300">Disclaimer</a>
                </li>
                <li className="mb-4">
                    <a href="/privacy-policy/" className="hover:font-bold transition-all duration-300">Kebijakan Privasi</a>
                </li>
                <li className="mb-4">
                    <a href="/pedoman-media-siber/" className="hover:font-bold transition-all duration-300">Pedoman Media Siber</a>
                </li>
            </ul>
        </div>
    </div>
    <div className="py-6 px-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 text-center">© 2022 <a href="/">Fandomnesia</a>. All Rights Reserved.
        </span>
    </div>
</footer>
    </>
  );
}
