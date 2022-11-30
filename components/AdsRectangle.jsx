import { siteUrl } from "../lib/config";

export default function AdsRectangle() {
  return (
    <div className="py-4 my-4 text-center">
      <span className="hr-lines text-sm text-gray-500 pb-4"> Iklan, Scroll Untuk Melanjutkan </span>
      <img
        className="block mx-auto"
        alt="contoh iklan"
        src={`${siteUrl}/img/contoh-iklan.jpg`}
        width="300"
        height="250"
      />
      <span className="hr-lines text-sm text-gray-500 pt-4"> Iklan, Scroll Untuk Melanjutkan </span>
    </div>
  );
}
