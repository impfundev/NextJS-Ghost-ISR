import { gql } from "@apollo/client";
import parse from "html-react-parser";
import Link from "next/link";

import { client } from "../lib/apolloClient";
import Layout from "../components/Layout";

const formatDate = (date) => new Date(date).toLocaleDateString();

export default function SinglePost({ post }) {
  const { date, title, content, author, categories } = post;
  const haveCategories = Boolean(categories?.nodes?.length);

  return (
    <Layout>
      <article className="prose lg:prose-xl">

        <h1>{title}</h1>

        <p>Oleh: {author.node.name}, <time className="text-gray-500" datetime={date}>{formatDate(date)}</time></p>
        
        {parse(content)}

        {haveCategories ? (
          <footer>
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
          </footer>
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
  query getPostBySlug($uri: ID!) {
    post(id: $uri, idType: URI) {
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
    }
  }
`;

export async function getStaticProps(context) {
  const uri = context.params.uri.join("/");

  const response = await client.query({
    query: GET_POST,
    variables: { uri },
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
