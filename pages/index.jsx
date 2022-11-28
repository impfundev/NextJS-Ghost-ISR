import { gql } from "@apollo/client";
import Head from "next/head";

import Layout from "../components/Layout";
import PostsList from "../components/PostsList";
import { client } from "../lib/apolloClient";

const GET_POSTS = gql`
  query getPosts {
    posts(first: 20, after: null) {
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
`;

export async function getStaticProps() {
  const response = await client.query({
    query: GET_POSTS,
  });

  const posts = response?.data?.posts.nodes;

  return {
    props: { posts },
    revalidate: 1,
  };
}

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Fandomnesia</title>
        <meta name="description" content="Fandomnesia Site" />
      </Head>
      <Layout>
        <PostsList posts={posts} />
      </Layout>
    </>
  );
}
