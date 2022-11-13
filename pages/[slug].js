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
                <div key={slug} className="px-4 py-2 bg-black text-white font-bold rounded-full">
                  <Link href={`/category/${slug}`}>
                    <a>
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
              <figcaption>{featuredImage.node.caption}</figcaption>
            ) : null}
          </figure>
        ) : null}

        <p>Oleh: <a href={`/author/${author.node.slug}`}>{author.node.name}</a>, Pada: <time className="text-gray-500" datetime={date}>{formatDate(date)}</time></p>
        
        {parse(content)}

        {haveTags ? (
          <>
          <h4>Tag:</h4>
          <ul className="flex gap-4 list-none">
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

export function getStaticPaths() {
  return {
    paths: [],
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
          sizes
          srcSet
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
    revalidate: 60,
  };
}
