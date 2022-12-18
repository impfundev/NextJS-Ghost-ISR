import Script from "next/script";

export default function Comment({ url }) {
  return (
    <>
      <div class="fb-comments" data-href={url} data-width="100%" data-numposts="5"></div>
      <div id="fb-root"></div>
      <Script
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            let lzAd = false;
            window.addEventListener('scroll', () => {
              (0 != document.documentElement.scrollTop && false === lzAd || 0 != document.body.scrollTop && !1 === lzAd) && (!function(){
                fbComment = document.createElement('script');
                fbComment.src = 'https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v15.0&autoLogAppEvents=1';
                fbComment.async = true;
                fbComment.setAttribute('crossorigin', 'anonymous');
                fbComment.setAttribute('nonce', '8IcioGBr');
                document.head.appendChild(fbComment);
              }(), lzAd = true);
            }, true);
          `,
        }}
        onLoad={() => {
          console.log('Lazy Script has loaded')
        }}
        onError={(e) => {
          console.error('Lazy Script failed to load', e)
        }}
      />
    </>
  );
}
