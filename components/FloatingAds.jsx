import { siteUrl } from "../lib/config";

export default function FloatingAds() {
  return (
  <>
    <button className="fixed bottom-0 right-0 p-3 bg-white rounded-t-lg border-t border-x border-inherit">⌵</button>
    <div className="fixed bottom-0 w-full h-14 bg-white border border-inherit">
      <img
        className="block mx-auto object-cover py-3 h-12"
        alt="contoh iklan"
        src={`${siteUrl}/img/contoh-iklan-2.png`}
        width="320"
        height="auto"
      />
    </div>
  </>
  );
}
