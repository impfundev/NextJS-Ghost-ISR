import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="container mx-auto px-5 pb-8">
        {children}
      </main>
<footer className="bg-gray-300">
    <div className="grid grid-cols-2 gap-8 py-8 px-6 md:grid-cols-4">
        <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-500">Situs</h2>
            <ul>
                <li className="mb-4">
                    <a href="/tentang-kami/" className="hover:underline">Tentang Kami</a>
                </li>
                <li className="mb-4">
                    <a href="/tentang-kami/" className="hover:underline">Kontak Kami</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-500">Channel</h2>
            <ul>
                <li className="mb-4">
                    <a href="#" className="hover:underline">YouTube</a>
                </li>
                <li className="mb-4">
                    <a href="https://twitter.com/fandomnesia_com" className="hover:underline">Twitter</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Facebook</a>
                </li>
                <li className="mb-4">
                    <a href="https://news.google.com/publications/CAAqBwgKMK2zowsw8L27Aw" className="hover:underline">Google News</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-500">Legal</h2>
            <ul>
                <li className="mb-4">
                    <a href="/disclaimer/" className="hover:underline">Disclaimer</a>
                </li>
                <li className="mb-4">
                    <a href="/privacy-policy/" className="hover:underline">Kebijakan Privasi</a>
                </li>
                <li className="mb-4">
                    <a href="/pedoman-media-siber/" className="hover:underline">Pedoman Media Siber</a>
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
