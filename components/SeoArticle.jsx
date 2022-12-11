import { NextSeo, NewsArticleJsonLd } from "next-seo";

export default function SeoArticle() {
  return (
    <NextSeo
      title={title}
      description={excerpt}
      canonical={`${siteUrl}/${slug}`}
      openGraph={{
        type: 'article',
        url: `${siteUrl}/${slug}`,
        title: title,
        description: excerpt,
        article: {
          publishedTime: published_at,
          modifiedTime: updated_at,
          authors: [
            `${post.primary_author.slug}`,
          ],
        },
        images: [
          {
            url: `${thumbnail.url}`,
            width: `${thumbnail.width}`,
            height: `${thumbnail.height}`,
            alt: title,
            type: `${thumbnail.mime}`,
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
      url={`${siteUrl}/${slug}`}
      title={title}
      images={[
        `${thumbnail.url}`,
      ]}
      datePublished={published_at}
      dateModified={updated_at}
      authorName={[
        {
          name: post.primary_author.name,
          url: `${siteUrl}/author/${post.primary_author.slug}`,
        },
      ]}
      publisherName={siteName}
      publisherLogo={`${siteUrl}/favicon.png`}
      description={excerpt}
      body={parse(html)}
      isAccessibleForFree={true}
    />
  );
}
