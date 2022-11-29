import React, { useEffect } from "react";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import LazyLoad from "react-lazy-load";
import date from "date-and-time";
import Head from "next/head";

import { client } from "../lib/apolloClient";
import { siteUrl } from "../lib/config";
import Layout from "../components/Layout";
import Share from "../components/Share";
import PostsList from "../components/PostsList";

export default function SinglePost({ item, related }) {
  const { title, excerpt, content, slug, author, featuredImage, categories, tags, seo } = item;
  const haveCategories = Boolean(categories?.nodes?.slice(0, 1).length);
  const haveTags = Boolean(tags?.nodes?.length);
  const dateFormated = date.format(new Date(item.date), 'DD MMMM YYYY HH:mm');
  const posts = related.posts.nodes.filter((posts) => posts.slug !== slug);

  useEffect(() => {
    let lzAd = false;
    window.addEventListener('scroll', () => {
      (0 != document.documentElement.scrollTop && false === lzAd || 0 != document.body.scrollTop && !1 === lzAd) && (!function(){
        const itemScript = document.createElement('script')
        .setAttribute('crossorigin', 'anonymous')
        .setAttribute('src', 'https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v15.0')
        .setAttribute('nonce', 'HZqJ51n7');
        .setAttribute('data-numposts', '5');
        itemScript.async = true;
        console.log(itemScript);
      }(), lzAd = true);
    }, true);
  });

  return (
    <>
    <Head>
      <
      <link href='//connect.facebook.net' rel='dns-prefetch'/>
      {parse(seo.fullHead)}
    </Head>
    <Layout>
      <>
        {haveCategories ? (
          <>
            {categories.nodes.map((category) => {
              const { slug, name } = category;
              return (
                <div className="py-4" key={slug}>
                  <a href={`${siteUrl}/category/${slug}`} className="px-3 py-1 bg-black text-white text-sm font-bold rounded-full">
                    {name}
                  </a>
                </div>
              );
            })}
          </>
        ) : null}
      </>
      <article className="prose lg:prose-xl">
        <h1 className="text-2xl md:text-4xl lg:text-6xl">
          {title}
        </h1>
        {featuredImage ? (
          <figure className="w-full">
            <img
              className="w-full h-auto"
              src={featuredImage.node.sourceUrl}
              alt={featuredImage.node.altText}
              srcSet={featuredImage.node.srcSet}
              sizes={featuredImage.node.sizes}
            />
            {featuredImage.node.caption ? (
              <figcaption className="py-0" dangerouslySetInnerHTML={{ __html: featuredImage.node.caption }} />
            ) : null}
          </figure>
        ) : null}
        <div className="flex items-center justify-between">
          <span>Oleh: <a href={`${siteUrl}/author/${author.node.slug}`}>{author.node.name}</a></span>
          <Share title={title} slug={slug} />
        </div>
        <p><time className="text-gray-500 text-sm" datetime={item.date}>{dateFormated}</time></p>
        <hr />
        {parse(content)}
      </article>
      <>
        {haveTags ? (
          <>
          <ul className="m-0 p-0 flex flex-wrap gap-1 list-none py-3">
            {tags.nodes.map((tag) => {
              const { slug, name } = tag;
              return (
                <li key={slug} className="m-0 p-0">
                  <a href={`${siteUrl}/tag/${slug}`} className="px-3 py-1 bg-black text-white text-sm font-bold rounded-full">
                    {name}
                  </a>
                </li>
              );
            })}
          </ul>
          </>
        ) : null}
      </>
      <div className="py-5">
        <div className="fb-comments" data-href={`${siteUrl}/${slug}`} data-width="100%" data-numposts="5" data-lazy="true"></div>
      </div>
      <div id="fb-root"></div>
      <h3 className="text-xl font-bold py-4">Artikel Terkait</h3>
      <LazyLoad threshold={0.95}>
        <>
          <PostsList posts={posts} />
        </>
      </LazyLoad>
    </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const GET_SLUG = gql`
    query getPosts {
      posts {
        nodes {
          slug
        }
      }
    }
  `;

  const { data } = await client.query({
    query: GET_SLUG,
  });

  return {
    paths: data?.posts.nodes.map((post) => `/${post.slug}`) || [],
    fallback: "blocking",
  };
}

const GET_POST = gql`
  query getPostBySlug($slugId: ID!) {
    post(id: $slugId, idType: SLUG) {
      title
      date
      slug
      excerpt
      content
      author {
        node {
          name
          slug
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          caption
          sizes
          srcSet
        }
      }
      categories(first: 1) {
        nodes {
          slug
          name
        }
      }
      tags {
        nodes {
          slug
          name
        }
      }
      seo {
        fullHead
      }
    }
  }
`;

const GET_RELATED = gql`
  query getRelated($catSlug: ID!) {
    category(id: $catSlug, idType: SLUG) {
      posts {
        nodes {
          title
          slug
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
              sizes
              srcSet
            }
          }
        }
      }
    }
  }
`;

export async function getStaticProps({ params }) {
  const { slug } = params;

  const response = await client.query({
    query: GET_POST,
    variables: { slugId: slug },
  });

  const item = response?.data?.post;

  if (!item) {
    return { notFound: true };
  };

  const { categories } = item;
  
  const secresponse = await client.query({
    query: GET_RELATED,
    variables: {
      catSlug: categories.nodes[0]?.slug,
    },
  });

  const related = secresponse?.data?.category;
  
  if (!related) {
    return null;
  };

  return {
    props: { item, related },
    revalidate: 1,
  };
}
