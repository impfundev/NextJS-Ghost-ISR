import Script from "next/script";

export default function Comment({ url }) {
  return (
    <>
      <Script
        src="https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v15.0"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, FB Comment has been populated`)
        }
        async="true"
        crossorigin="anonymous"
        nonce="HZqJ51n7"
        data-numposts="5"
      />
    <div className="py-5">
      <div className="fb-comments" data-href={url} data-width="100%" data-numposts="5"></div>
    </div>
    <div id="fb-root"></div>
  </>
  );
}
