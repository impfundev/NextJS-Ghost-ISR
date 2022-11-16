import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import date from "date-and-time";
import id from "date-and-time/locale/id";
import Link from "next/link";

import { client } from "../lib/apolloClient";
import Layout from "../components/Layout";
import PostsList from "../components/PostsList";

export default function SinglePost({ item }) {
  const { date, title, content, author, featuredImage, categories, tags } = item;
  const haveCategories = Boolean(categories?.nodes?.slice(0, 1).length);
  const haveTags = Boolean(tags?.nodes?.length);

  return (
    <Layout>
      <article className="prose lg:prose-xl">

        <h1 className="text-2xl md:text-4xl lg:text-6xl">
          {title}
        </h1>

        {haveCategories ? (
          <>
            {categories.nodes.map((category) => {
              const { slug, name } = category;
              return (
                <div key={slug}>
                  <Link href={`/category/${slug}`}>
                    <a className="px-4 py-2 bg-black text-white font-bold rounded-full">
                      {name}
                    </a>
                  </Link>
                </div>
              );
            })}
          </>
        ) : null}

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
          Oleh: <a href={`/author/${author.node.slug}`}>{author.node.name}</a><hr />
          <time className="text-gray-500 text-sm" datetime={date}>{date.format(date, 'dddd, DD MMMM YYYY [Jam] HH:mm').locale(id)}</time>
        </p>
        
        {parse(content)}

      </article>

      <>
        {haveTags ? (
          <>
          <ul className="m-0 p-0 flex flex-wrap gap-1 list-none py-5">
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
    </Layout>
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
      modified
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
