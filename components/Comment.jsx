import Script from "next/script";

export default function Comment({ url }) {
  return (
    <>
      <div class="fb-comments" data-href={url} data-width="100%" data-numposts="5"></div>
    </>
  );
}
