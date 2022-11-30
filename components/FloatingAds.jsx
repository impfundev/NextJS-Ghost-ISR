import { siteUrl } from "../lib/config";

export default function FloatingAds() {
  return (
  <>
    <div className="fixed bottom-0 left-1/2 translate-x-1/2 w-full h-auto max-h-28 bg-white border border-inherit">
      <img
        className="block mx-auto w-full h-auto object-cover px-4 pb-4"
        alt="contoh iklan"
        src={`${siteUrl}/img/contoh-iklan-2.png`}
        width="320"
        height="100"
      />
    </div>
  </>
  );
}
