import { siteUrl } from "../lib/config";

export default function FloatingAds() {
  return (
  <>
    <div className="fixed bottom-0 left-1/2 translate-x-1/2 w-full h-auto max-h-28 bg-white border border-inherit">
      <button className="absolute bottom-28 right-0 p-2 flex items-center bg-white rounded-t-lg border-x border-t border-inherit">
        <span>⌵</span>
      </button>
      <img
        className="block mx-auto w-full h-28 object-cover px-4 pb-4"
        alt="contoh iklan"
        src={`${siteUrl}/img/contoh-iklan-2.png`}
        width="320"
        height="100"
      />
    </div>
  </>
  );
}
