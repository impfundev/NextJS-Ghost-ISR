import { gql, useQuery } from "@apollo/client";
import { GetStaticPropsContext } from "next";
import Head from "next/head";

import Layout from "../components/Layout";
import PostsList from "../components/PostsList";
import { initializeApollo, addApolloState } from "../lib/TsApolloClient";

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

export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTS);
  const posts = data?.posts?.nodes;
  const havePosts = Boolean(posts.length);

  return (
    <>
      <Head>
        <title>Fandomnesia</title>
        <meta name="description" content="Fandomnesia Site" />
      </Head>
      <Layout>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error has occurred.</p>
      ) : !havePosts ? (
        <p>No posts found.</p>
      ) : (
        <PostsList posts={posts} />
      )}
      </Layout>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: GET_POSTS,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  };
}
