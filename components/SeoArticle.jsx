import { NextSeo, NewsArticleJsonLd } from "next-seo";

export default function SeoArticle({
  url,
  body,
  title,
  images,
  excerpt,
  siteUrl,
  siteName,
  authorName,
  authorSlug,
  modifiedTime,
  publishedTime,
  publisherLogo,
}) {
  return (
  <>
    <NextSeo
      title={title}
      description={excerpt}
      canonical={url}
      openGraph={{
        type: 'article',
        url: url,
        title: title,
        description: excerpt,
        article: {
          publishedTime: publishedTime,
          modifiedTime: modifiedTime,
          authors: [
            `${authorSlug}`,
          ],
        },
        images: [
          {
            url: `${images.url}`,
            width: `${images.width}`,
            height: `${images.height}`,
            alt: title,
            type: `${images.mime}`,
          }
        ],
        siteName: siteName,
      }}
      twitter={{
        handle: '@fandomnesia_com',
        site: '@fandomnesia_com',
        cardType: 'summary_large_image',
      }}
    />
    <NewsArticleJsonLd
      url={url}
      title={title}
      images={[
        `${images.url}`,
      ]}
      datePublished={publishedTime}
      dateModified={modifiedTime}
      authorName={[
        {
          name: authorName,
          url: `${siteUrl}/author/${authorSlug}`,
        },
      ]}
      publisherName={siteName}
      publisherLogo={`${siteUrl}/favicon.png`}
      description={excerpt}
      body={body}
      isAccessibleForFree={true}
    />
  </>
  );
}
