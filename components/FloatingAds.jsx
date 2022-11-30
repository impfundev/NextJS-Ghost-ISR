import { siteUrl } from "../lib/config";

export default function FloatingAds() {
  return (
  <>
    <button className="fixed bottom-20 right-0 p-2 bg-white rounded-t-lg border-t border-x border-inherit">⌵</button>
    <div className="fixed bottom-0 w-full h-20 bg-white border border-inherit">
      <img
        className="block mx-auto object-cover py-2 w-[320px] h-auto"
        alt="contoh iklan"
        src={`${siteUrl}/img/contoh-iklan-2.png`}
      />
    </div>
  </>
  );
}
