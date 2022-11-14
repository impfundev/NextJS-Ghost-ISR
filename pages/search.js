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
        slug
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

export default function Search(props) {
  const { posts } = props;
  
  return (
    <>
    <Layout>
      <article className="prose lg:prose-xl">
        <h1>Temukan Berita atau Konten Menarik yang cari disini</h1>
        <script async src="https://cse.google.com/cse.js?cx=fd73c201cbd659445"></script>
        <div className="gcse-search"></div>
        <h2>Artikel Terbaru</h2>
        <PostsList posts={posts} />
      </article>
    </Layout>
    </>
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
  };
}
