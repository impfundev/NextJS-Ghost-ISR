import { siteUrl } from "../lib/config";

export default function AdsRectangle() {
  return (
    <div className="py-4 my-4 text-center border-y border-gray-500">
      <span className="text-sm text-gray-500 pb-4">Iklan, Scroll Untuk Melanjutkan</span>
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
