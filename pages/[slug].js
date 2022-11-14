import { gql } from "@apollo/client";
import parse from "html-react-parser";
import Link from "next/link";

import { client } from "../lib/apolloClient";
import Layout from "../components/Layout";

const formatDate = (date) => new Date(date).toLocaleDateString();

export default function SinglePost({ post }) {
  const { date, title, content, author, featuredImage, categories, tags } = post;
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
          </figure>
        ) : null}

        <p>Oleh: <a href={`/author/${author.node.slug}`}>{author.node.name}</a>, Pada: <time className="text-gray-500" datetime={date}>{formatDate(date)}</time></p>
        
        {parse(content)}

        {haveTags ? (
          <>
          <ul className="flex gap-4 list-none pb-5">
            {tags.nodes.map((tag) => {
              const { slug, name } = tag;
              return (
                <li key={slug}>
                  <Link href={`/tag/${slug}`}>
                    <a className="px-4 py-2 bg-black text-white font-bold rounded-full">
                      {name}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
          </>
        ) : null}

      </article>
    </Layout>
  );
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
        }
      }
      categories {
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

const GET_SLUG = gql`
  query getPosts {
    posts(first: 9999, after: null) {
      nodes {
        slug
      }
    }
  }
`;

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_SLUG,
    variables: { slugId: slug },
  });

  const slug = data?.posts.nodes.map((post) => {
    return ({ post.slug })
  });

  return {
    paths: slug || [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;

  const response = await client.query({
    query: GET_POST,
    variables: { slugId: slug },
  });

  const post = response?.data?.post;

  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post },
  };
}
