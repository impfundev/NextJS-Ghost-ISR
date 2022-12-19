import Script from "next/script";

export default function googleScript() {
  return (
    <>
      <Script
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            let lzAd = false;
            window.addEventListener('scroll', () => {
              (0 != document.documentElement.scrollTop && false === lzAd || 0 != document.body.scrollTop && !1 === lzAd) && (!function(){
                gaScript = document.createElement('script');
                gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-25F265VVXN';
                gaScript.async = true;
                document.head.appendChild(gaScript);
              }(), lzAd = true);
            }, true);
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-25F265VVXN');
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
