import dynamic from "next/dynamic";
import { Suspense } from "react";

import { siteName, siteUrl } from "../lib/config";
import SeoArticle from "./SeoArticle";

const Layout = dynamic(() => import("./Layout"), {
  suspense: true,
  ssr: false,
});
const PrimaryTags = dynamic(() => import("./PrimaryTags"), {
  suspense: true,
  ssr: false,
});
const Thumbnail = dynamic(() => import("./Thumbnail"), {
  suspense: true,
});
const Author = dynamic(() => import("./Author"), {
  suspense: true,
  ssr: false,
});
const DateUpdate = dynamic(() => import("./DateUpdate"), {
  suspense: true,
  ssr: false,
});
const DatePublish = dynamic(() => import("./DatePublish"), {
  suspense: true,
  ssr: false,
});
const Content = dynamic(() => import("./Content"), {
  suspense: true,
  ssr: false,
});
const Tags = dynamic(() => import("./Tags"), {
  suspense: true,
  ssr: false,
});
const Comment = dynamic(() => import("./Comment"), {
  suspense: true,
  ssr: false,
});
const MorePost = dynamic(() => import("./MorePost"), {
  suspense: true,
  ssr: false,
});

export default function Post({ post, relatedPosts, thumbnail }) {
  const { title, excerpt, html, slug, tags, feature_image_caption, updated_at, published_at } = post;

  return (
    <>
    <SeoArticle
      url={`${siteUrl}/${slug}`}
      body={html}
      title={title}
      images={thumbnail}
      excerpt={excerpt}
      siteUrl={siteUrl}
      siteName={siteName}
      authorName={post.primary_author.name}
      authorSlug={post.primary_author.slug}
      modifiedTime={updated_at}
      publishedTime={published_at}
      publisherLogo={`${siteUrl}/favicon.png`}
    />
    <Layout>
    {post.primary_tag ? (
    <>
      <PrimaryTags tag={post.primary_tag} siteUrl={siteUrl} />
    </>
    ) : null}
      <article className="prose">
        <h1 className="text-2xl">
          {title}
        </h1>
        {thumbnail ? (
          <Thumbnail
            thumbnail={thumbnail}
            caption={feature_image_caption}
            title={title}
          />
        ) : null}
        <Author
          author={post.primary_author}
          siteUrl={siteUrl}
          title={title}
          slug={slug}
        />
        {updated_at ? (
          <DateUpdate update={updated_at} />
        ) : (
          <DatePublish publish={published_at} />
        )}
        <hr />
        <Content content={html} />
      </article>
      {tags ? (
        <>
          <Tags tags={tags} siteUrl={siteUrl} />
        </>
      ) : null}
      <Comment url={`${siteUrl}/${slug}`} />
      <MorePost
        posts={relatedPosts}
        thumbnail={thumbnail}
      />
    </Layout>
    </>
  );
}
