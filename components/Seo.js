export default function Seo({
  url,
  post,
  title,
  image,
  publish,
  modified,
  authorUrl,
  authorName,
  description,
  articleBody,
}) {
  function articleJsonLd() {
    return {
      __html: `{
      "@context": "https://schema.org/",
      "@type": "NewsArticle",
      "url": url,
      "headline": title,
      "mainEntityOfPage": url,
      "articleBody": articleBody,
      "image": image,
      "description": description,
      "datePublished": publish,
      "dateModified": modified,
      "author": {
        "@type": "Person",
        "name": authorName,
        "url": authorUrl,
      },
      "publisher": {
        "@type": "Organization",
        "name": "Fandomnesia",
        "url": "https://www.fandomnesia.com",
      }
    }
  `,
    };
  }
  
  return (
  <>
    <title>{title}</title>
    <meta
      name="description"
      content={description}
      key="desc"
    />
    <meta property="og:title" content={title} />
    <meta
      property="og:description"
      content={description}
    />
    {post === true (
        <meta
          property="og:image"
          content={image}
        />
    ) : null}
    {post === true (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={articleJsonLd()}
        key="article-jsonld"
      />
    ) : null}
  </>
  );
}
