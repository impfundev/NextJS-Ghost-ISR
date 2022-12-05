import { useState } from "react";

export default function Header() {
  const [navActive, setNavActive] = useState(false);
  const handleClick = () => {
    setNavActive(!navActive);
  };
  
  return (
    <header className="sticky top-0 bg-yellow-400 border-b border-black z-50">
      <div className="flex items-center justify-between container mx-auto px-5 py-4">
          <a href="/" className="flex items-center gap-4">
            <svg className="rounded-full" version="1.0" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 152.000000 152.000000" preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,152.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M0 760 l0 -760 760 0 760 0 0 760 0 760 -760 0 -760 0 0 -760z m699 519 c35 -5 107 -30 160 -54 110 -50 168 -63 210 -46 28 12 51 47 51 77 0 25 35 12 38 -14 7 -46 -19 -159 -49 -210 -80 -140 -243 -150 -439 -28 -117 74 -144 86 -185 86 -66 0 -98 -65 -52 -108 12 -11 52 -34 89 -50 79 -36 144 -92 153 -133 l7 -29 124 0 c102 0 124 -3 124 -15 0 -12 -23 -15 -122 -17 l-123 -3 -3 -217 -2 -218 -155 0 -155 0 0 374 c0 344 2 379 20 437 29 97 87 150 183 169 58 11 55 11 126 -1z"/></g>
            </svg>
            <span className="text-lg font-bold">
              Fandomnesia
            </span>
          </a>
        <div className="flex items-center gap-4">
          <a
            href="https://cse.google.com/cse?cx=e7431585e16a34e4b"
            rel="search"
            aria-label="Search Page"
            target="_blank"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
          </a>
          <button onClick={handleClick} aria-label="Main Menu">
            { ! navActive ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/></svg>
            )}
          </button>
        </div>
      </div>
      <nav className={`${ navActive ? 'h-screen w-screen pt-16 text-black' : 'h-0 text-white' } container mx-auto px-5 bg-white absolute overflow-hidden transition-all ease-in-out duration-300`}>
        <ul className="flex flex-col gap-4 items-center sm:justify-center">
          <li>
            <a href="/" onClick={handleClick}>Beranda</a>
          </li>
          <li>
            <a href="/category/budaya-populer" onClick={handleClick}>Budaya Populer</a>
          </li>
          <li>
            <a href="/category/selebritis" onClick={handleClick}>Selebritis</a>
          </li>
          <li>
            <a href="/category/olahraga" onClick={handleClick}>Olahraga</a>
          </li>
          <li>
            <a href="/category/teknologi" onClick={handleClick}>Teknologi</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
