import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import date from "date-and-time";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";

import { client } from "../lib/apolloClient";
import Layout from "../components/Layout";
import Share from "../components/Share";

export default function SinglePost({ item }) {
  const { title, excerpt, content, slug, author, featuredImage, categories, tags } = item;
  const haveCategories = Boolean(categories?.nodes?.slice(0, 1).length);
  const haveTags = Boolean(tags?.nodes?.length);
  const dateFormated = date.format(new Date(item.date), 'DD MMMM YYYY HH:mm');
  const siteUrl = "https://www.fandomnesia.com";

  const ArticleJsonLd = () => {
    return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": title,
        "image": featuredImage.node.sourceUrl,
        "datePublished": item.date,
        "dateModified": item.date,
        "author": {
          "@type": "Person",
          "name": author.node.name,
          "url": `${siteUrl}/author/${author.node.slug}`,
        },
      }`;
    };
  };

  return (
    <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={parse(excerpt)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ArticleJsonLd}
        key="article-jsonld"
      />
    </Head>
    <Layout>
      <>
        {haveCategories ? (
          <>
            {categories.nodes.map((category) => {
              const { slug, name } = category;
              return (
                <div className="py-4" key={slug}>
                  <Link href={`/category/${slug}`}>
                    <a className="px-3 py-1 bg-black text-white text-sm font-bold rounded-full">
                      {name}
                    </a>
                  </Link>
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
          <figure>
            <img
              src={featuredImage.node.sourceUrl}
              alt={featuredImage.node.altText}
            />
            {featuredImage.node.caption ? (
              <figcaption>{parse(featuredImage.node.caption)}</figcaption>
            ) : null}
          </figure>
        ) : null}
        <p>
          Oleh: <a href={`/author/${author.node.slug}`}>{author.node.name}</a><br />
          <time className="text-gray-500 text-sm" datetime={item.date}>{dateFormated}</time>
        </p>
        <Share title={title} slug={slug} excerpt={excerpt} />
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
                  <Link href={`/tag/${slug}`}>
                    <a className="px-3 py-1 bg-black text-white text-sm font-bold rounded-full">
                      {name}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
          </>
        ) : null}
      </>
      <div className="py-5">
        <div className="fb-comments" data-href={slug} data-width="100%" data-numposts="4" data-lazy="true"></div>
      </div>
      <div id="fb-root"></div>
      <Script src="https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v15.0" />
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
    paths: data?.posts.nodes.map((post) => `/${post.slug}` ) || [],
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
    }
  }
`;

export async function getStaticProps(context) {
  const { slug } = context.params;

  const response = await client.query({
    query: GET_POST,
    variables: { slugId: slug },
  });

  const item = response?.data?.post;

  if (!item) {
    return { notFound: true };
  };

  return {
    props: { item },
    revalidate: 60,
  };
}
