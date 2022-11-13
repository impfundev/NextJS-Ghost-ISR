import { gql } from "@apollo/client";
import parse from "html-react-parser";
import Link from "next/link";

import { client } from "../lib/apolloClient";
import Layout from "../components/Layout";

const formatDate = (date) => new Date(date).toLocaleDateString();

export default function SinglePost({ post }) {
  const { date, title, content, author, categories, tags } = post;
  const haveCategories = Boolean(categories?.nodes?.length);
  const haveTags = Boolean(tags?.nodes?.length);

  return (
    <Layout>
      <article className="prose lg:prose-xl">

        <h1>{title}</h1>

        <p>Oleh: {author.node.name}, <time className="text-gray-500" datetime={date}>{formatDate(date)}</time></p>
        
        {parse(content)}

        {haveCategories ? (
          <div className="flex gap-4">
            <h4>Kategori:</h4>
            <ul className="flex gap-4">
              {categories.nodes.map((category) => {
                const { slug, name } = category;
                return (
                  <li key={slug}>
                    <Link href={`/category/${slug}`}>
                      <a className="font-bold">
                        {name}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {haveTags ? (
          <div className="flex gap-4">
            <h4>Tag:</h4>
            <ul className="flex gap-4">
              {tags.nodes.map((tag) => {
                const { slug, name } = tag;
                return (
                  <li key={slug}>
                    <Link href={`/tag/${slug}`}>
                      <a className="font-bold">
                        {name}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
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
      content
      author {
        node {
          name
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
