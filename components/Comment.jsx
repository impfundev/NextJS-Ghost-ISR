import Script from "next/script";

export default function Comment({ url }) {
  return (
    <>
      <div class="fb-comments" data-href={url} data-width="100%" data-numposts="5"></div>
      <div id="fb-root"></div>
      <Script
        src="https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v15.0&appId=5628930273871755&autoLogAppEvents=1"
        strategy="lazyOnload"
        nonce="8IcioGBr"
      />
    </>
  );
}
