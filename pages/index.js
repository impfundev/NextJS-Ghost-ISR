import { gql } from "@apollo/client";

import { client } from "../lib/apolloClient";
import Layout from "../components/Layout";
import PostsList from "../components/PostsList";

const GET_POSTS = gql`
  query getPosts {
    posts(first: 20, after: null) {
      nodes {
        databaseId
        title
        uri
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export default function Home(props) {
  const { posts } = props;

  return (
    <Layout>
      <h1>Terbaru</h1>
      <PostsList posts={posts} />
    </Layout>
  );
}

export async function getStaticProps() {
  const response = await client.query({
    query: GET_POSTS,
  });

  return {
    props: {
      posts: response.data.posts.nodes,
    },
    revalidate: 10,
  };
}
