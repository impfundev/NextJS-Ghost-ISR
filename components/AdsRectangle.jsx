import { siteUrl } from "../lib/config";

export default function AdsRectangle() {
  return (
    <img
      className="block mx-auto"
      alt="contoh iklan"
      src={`${siteUrl}/img/contoh-iklan.jpg`}
      width="300"
      height="250"
    />
  );
}
