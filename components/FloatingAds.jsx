import { siteUrl } from "../lib/config";

export default function FloatingAds() {
  return (
  <>
    <div className="floating-ads w-full h-28 bg-white border border-inherit">
      <button className="absolute bottom-28 right-0 p-3 bg-white border-t border-x border-inherit">⌵</button>
      <img
        className="block mx-auto object-cover p-3"
        alt="contoh iklan"
        src={`${siteUrl}/img/contoh-iklan-2.png`}
        width="320"
        height="100"
      />
    </div>
  </>
  );
}
