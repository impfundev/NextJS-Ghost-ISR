import { Suspense } from "react";
import dynamic from "next/dynamic";

import { siteName, siteUrl } from "../lib/config";
import SeoArticle from "./SeoArticle";

import Layout from "./Layout";
import Thumbnail from "./Thumbnail";
import Author from "./Author";
import DateUpdate from "./DateUpdate";
import DatePublish from "./DatePublish";
import Content from "./Content";

const PrimaryTags = dynamic(() => import("./PrimaryTags"), {
  suspense: true,
  ssr: false,
});
const Tags = dynamic(() => import("./Tags"), {
  suspense: true,
  ssr: false,
});
const PostsList = dynamic(() => import("./PostsList"), {
  suspense: true,
  ssr: false,
});
const Comment = dynamic(() => import("./Comment"), {
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
      <h3 className="text-lg font-bold py-4">Artikel Terbaru</h3>
      <PostsList
        posts={posts}
      />
    </Layout>
    </>
  );
}
