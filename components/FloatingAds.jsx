import { siteUrl } from "../lib/config";

export default function FloatingAds() {
  return (
  <>
    <button className="fixed bottom-28 right-0 p-3 bg-white border-t border-x border-inherit">⌵</button>
    <div className="floating-ads w-full h-28 bg-white border border-inherit">
      <img
        className="object-cover py-3 h-28"
        alt="contoh iklan"
        src={`${siteUrl}/img/contoh-iklan-2.png`}
        width="320"
        height="auto"
      />
    </div>
  </>
  );
}
