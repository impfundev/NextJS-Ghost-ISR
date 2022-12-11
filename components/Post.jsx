import LazyLoad from "react-lazy-load";
import parse from "html-react-parser";
import probe from "probe-image-size";
import date from "date-and-time";

import { NextSeo, NewsArticleJsonLd } from "next-seo";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Image from "next/image";
import Head from "next/head";

import { siteName, siteUrl } from "../lib/config";

const Layout = dynamic(() => import("./Layout"), {
  suspense: true,
  ssr: false,
});
const Share = dynamic(() => import("./Share"), {
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
    <Head>
      <script
        dangerouslySetInnerHTML={{
        __html: `let lzAd = false;
          window.addEventListener('scroll', () => {
            (0 != document.documentElement.scrollTop && false === lzAd || 0 != document.body.scrollTop && !1 === lzAd) && (!function(){
              itemScript = document.createElement('script');
              itemScript.src= 'https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v15.0';
              itemScript.async = true;
              itemScript.setAttribute('crossorigin', 'anonymous');
              itemScript.setAttribute('nonce', 'HZqJ51n7');
              itemScript.setAttribute('data-numposts', '5');
              document.head.appendChild(itemScript);
            }(), lzAd = true);
          }, true);`
        }}
      />
    </Head>
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
    <Layout>
    {post.primary_tag ? (
    <>
      <ul className="m-0 p-0 flex flex-wrap gap-1 list-none py-3">
        <li key={post.primary_tag.slug} className="m-0 p-0">
          <a href={`${siteUrl}/tag/${post.primary_tag.slug}`} className="px-3 py-1 bg-black text-white text-sm font-bold rounded-full">
            {post.primary_tag.name}
          </a>
        </li>
      </ul>
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
      <div className="py-5">
        <div className="fb-comments" data-href={`${siteUrl}/${slug}`} data-width="100%" data-numposts="5"></div>
      </div>
      <div id="fb-root"></div>
      <h3 className="text-lg font-bold py-4">Artikel Terbaru</h3>
      <LazyLoad threshold={0.95}>
        <PostsList posts={relatedPosts} />
      </LazyLoad>
    </Layout>
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
    </>
  );
}
