import Link from "next/link";

export default function Nav({ className }) {
  return (
    <nav className={className}>
      <ul className="flex flex-col md:flex-row gap-4 items-center justify-center text-right font-bold">
        <li>
          <Link href="/">
            <a>Beranda</a>
          </Link>
        </li>
        <li>
          <Link href="/category/budaya-populer">
            <a>Budaya Populer</a>
          </Link>
        </li>
        <li>
          <Link href="/category/selebritis">
            <a>Selebritis</a>
          </Link>
        </li>
        <li>
          <Link href="/category/olahraga">
            <a>Olahraga</a>
          </Link>
        </li>
        <li>
          <Link href="/category/teknologi">
            <a>Teknologi</a>
          </Link>
        </li>
        <li>
          <Link href="/search">
            <a>Search</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
