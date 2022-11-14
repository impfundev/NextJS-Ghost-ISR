import { gql } from "@apollo/client";
import parse from "html-react-parser";

import { client } from "../../lib/apolloClient";
import Layout from "../../components/Layout";
import PostsList from "../../components/PostsList";

export default function SingleTag({ tag }) {
  return (
    <Layout>
      <h1>{parse(tag.name)}</h1>
      <PostsList posts={tag.posts.nodes} />
    </Layout>
  );
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

const GET_TAG = gql`
  query getTag($slugId: ID!) {
    tag(id: $slugId, idType: SLUG) {
      name
      posts {
        nodes {
          databaseId
          title
          excerpt
          slug
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`;

export async function getStaticProps(context) {
  const { slug } = context.params;

  const response = await client.query({
    query: GET_TAG,
    variables: { slugId: slug },
  });

  const tag = response?.data?.tag;

  if (!tag) {
    return { notFound: true };
  }

  return {
    props: { tag },
  };
}
