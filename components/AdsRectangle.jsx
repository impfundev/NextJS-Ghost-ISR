import { siteUrl } from "../lib/config";

export default function AdsRectangle() {
  return (
    <div className="py-4 my-4 text-center border-y border-inherit">
      <span className="text-sm text-inherit pb-4 before:content-['Iklan,_Scroll_Untuk_Melanjutkan']"></span>
      <img
        className="block mx-auto py-4"
        alt="contoh iklan"
        src={`${siteUrl}/img/contoh-iklan.jpg`}
        width="300"
        height="250"
      />
    </div>
  );
}
