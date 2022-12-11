import LazyLoad from "react-lazy-load";
import parse from "html-react-parser";
import probe from "probe-image-size";
import date from "date-and-time";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Image from "next/image";

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
const Share = dynamic(() => import("./Share"), {
  suspense: true,
  ssr: false,
});
const Comment = dynamic(() => import("./Comment"), {
  suspense: true,
  ssr: false,
});
const PostsList = dynamic(() => import("./PostsList"), {
  suspense: true,
});

export default function Post({ post, relatedPosts, thumbnail }) {
  const { title, excerpt, html, slug, tags, feature_image_caption, updated_at, published_at } = post;
  const dateFormat = date.format(new Date(`${updated_at ? updated_at : published_at}`), 'DD MMMM YYYY HH:mm');

  return (
    <>
    <SeoArticle
      url={`${siteUrl}/${slug}`}
      body={parse(html)}
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
          <figure className="w-full block">
            <Image
              src={thumbnail.url}
              width={thumbnail.width}
              height={thumbnail.height}
              alt={title}
              layout="responsive"
              quality={80}
              priority
            />
            {feature_image_caption ? (
              <figcaption className="py-0">{feature_image_caption}</figcaption>
            ) : null}
          </figure>
        ) : null}
        <div className="flex items-center justify-between">
          {post.primary_author ? (
            <>
              <span>Oleh: <a href={`${siteUrl}/author/${post.primary_author.slug}`}>{post.primary_author.name}</a></span>
            </>
          ) : null}
          <Share title={title} slug={slug} />
        </div>
        <p><time className="text-gray-500 text-sm" datetime={updated_at ? updated_at : published_at}>{dateFormat}</time></p>
        <hr />
        {parse(html)}
      </article>
      {tags ? (
      <>
      <ul className="m-0 p-0 flex flex-wrap gap-1 list-none py-3">
        {tags.map((tag) => {
          return (
            <li key={tag.id} className="m-0 p-0">
              <a href={`${siteUrl}/tag/${parse(tag.slug)}`} className="px-3 py-1 bg-black text-white text-sm font-bold rounded-full">
                {tag.name}
              </a>
            </li>
          );
        })}
      </ul>
      </>
      ) : null}
      <Comment url={`${siteUrl}/${slug}`} />
      <h3 className="text-lg font-bold py-4">Artikel Terbaru</h3>
      <LazyLoad threshold={0.95}>
        <PostsList posts={relatedPosts} />
      </LazyLoad>
    </Layout>
    </>
  );
}
