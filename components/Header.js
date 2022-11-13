import React, { useState } from "react";
import Link from "next/link";
import Nav from "./Nav";

export default function Header() {
  const [navActive, setNavActive] = useState(false);
  const handleClick = () => {
    setNavActive(!navActive);
  };

  return (
    <header className="sticky top-0 bg-white flex items-center justify-between container mx-auto px-5 py-4">
      <Link href="/">
        <a className="text-xl font-extrabold tracking-tight">
          Fandomnesia
        </a>
      </Link>
      <button className="font-bold md:hidden" onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </button>
      <Nav className={`${ navActive ? '' : 'hidden' } m-4 bg-white md:block md:m-auto`} />
    </header>
  );
}
