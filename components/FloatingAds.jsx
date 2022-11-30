import { siteUrl } from "../lib/config";

export default function FloatingAds() {
  return (
    <button className="fixed bottom-28 m-3 flex items-center bg-white rounded-t-lg border-x border-t border-inherit">︿</button>
    <div className="fixed bottom-0 m-3 w-full h-auto max-h-28 bg-white border border-inherit">
      <img
        className="block mx-auto w-full h-auto"
        alt="contoh iklan"
        src={`${siteUrl}/img/contoh-iklan-2.png`}
        width="300"
        height="250"
      />
    </div>
  );
}
