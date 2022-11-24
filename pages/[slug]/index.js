import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import date from "date-and-time";
import Link from "next/link";
import Head from "next/head";

import { client } from "../../lib/apolloClient";
import Layout from "../../components/Layout";
import Share from "../../components/Share";
import PostCard from "../../components/PostCard";

export default function SinglePost({ item, related }) {
  const { title, excerpt, content, slug, author, featuredImage, categories, tags, seo } = item;
  const haveCategories = Boolean(categories?.nodes?.slice(0, 1).length);
  const haveTags = Boolean(tags?.nodes?.length);
  const dateFormated = date.format(new Date(item.date), 'DD MMMM YYYY HH:mm');
  const { posts } = related;
  
  return (
    <>
    <Head>
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
              className="object-cover"
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
          <span>Oleh: <a href={`/author/${author.node.slug}`}>{author.node.name}</a></span>
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
        <div className="fb-comments" data-href={`https://fandomnesia-react.vercel.app/${slug}`} data-width="100%" data-numposts="4" data-lazy="true"></div>
      </div>
      <div id="fb-root"></div>
      <script async src="https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v15.0"></script>
      <h3 className="text-xl font-bold py-4">Artikel Terkait</h3>
      <ul className="grid md:grid-cols-2 gap-6 py-5">
          <>
            {posts.nodes.filter((post) => post.slug !== slug).map((post) => {
              return (
                <li key={post.slug}>
                  <PostCard post={post} />
                </li>
             );
           })}
        </>
      </ul>
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
    revalidate: 60,
  };
}
