import React, { useState } from "react";
import Nav from "./Nav";

export default function Header() {
  const [navActive, setNavActive] = useState(false);
  const handleClick = () => {
    setNavActive(!navActive);
  };

  return (
    <header className="sticky top-0 bg-white flex items-center justify-between py-4">
      <div className="text-xl font-extrabold tracking-tight">Fandomnesia</div>
      <button className="font-bold" onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </button>
      <Nav className={`${ navActive ? '' : 'hidden' }`} />
    </header>
  );
}
