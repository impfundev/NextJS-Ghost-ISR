import { useState } from "react";
import { siteUrl } from "../lib/config";

export default function FloatingAds() {
  const [adsActive, setAdsActive] = useState(false);
  const handleAds = () => {
    setAdsActive(!adsActive);
  };

  return (
  <>
    <button aria-label="Floating Ads" onClick={handleAds} className="fixed bottom-20 right-0 p-1 bg-white font-medium rounded-t-lg border-t border-x border-inherit">
      { adsActive ? (
        <span>﹀</span>
      ) : (
        <span>︿</span>
      )}
    </button>
    <div className={`fixed bottom-0 w-full ${ navActive ? 'h-20' : 'h-0' } bg-white border border-inherit transition-all ease-in-out duration-300`}>
      <img
        className="block mx-auto object-cover py-2 w-[320px] h-auto"
        alt="contoh iklan"
        src={`${siteUrl}/img/contoh-iklan-2.png`}
      />
    </div>
  </>
  );
}
