import React, { useState } from "react";
import Link from "next/link";
import Nav from "./Nav";

export default function Header() {
  const [navActive, setNavActive] = useState(false);
  const handleClick = () => {
    setNavActive(!navActive);
  };

  return (
    <header className="sticky top-0 bg-white">
      <div className="flex items-center justify-between container mx-auto px-5 py-4">
        <Link href="/">
          <a className="flex items-center gap-4">
            <svg className="rounded-full" version="1.0" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 152.000000 152.000000" preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,152.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M0 760 l0 -760 760 0 760 0 0 760 0 760 -760 0 -760 0 0 -760z m699 519 c35 -5 107 -30 160 -54 110 -50 168 -63 210 -46 28 12 51 47 51 77 0 25 35 12 38 -14 7 -46 -19 -159 -49 -210 -80 -140 -243 -150 -439 -28 -117 74 -144 86 -185 86 -66 0 -98 -65 -52 -108 12 -11 52 -34 89 -50 79 -36 144 -92 153 -133 l7 -29 124 0 c102 0 124 -3 124 -15 0 -12 -23 -15 -122 -17 l-123 -3 -3 -217 -2 -218 -155 0 -155 0 0 374 c0 344 2 379 20 437 29 97 87 150 183 169 58 11 55 11 126 -1z"/></g>
            </svg>
            <span className="text-lg font-extrabold tracking-tight">
              Fandomnesia
            </span>
          </a>
        </Link>
        <button className="font-bold md:hidden" onClick={handleClick}>
          { ! navActive ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/></svg>
          )}
        </button>
      </div>
      <Nav className={`${ navActive ? 'h-screen pt-16 text-black' : 'h-0 text-white' } container mx-auto px-5 bg-white absolute overflow-hidden transition-all ease-in-out duration-300 md:block md:h-[auto] md:static md:px-4`} />
    </header>
  );
}
