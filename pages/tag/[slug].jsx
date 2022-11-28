import { gql } from "@apollo/client";
import { client } from "../../lib/apolloClient";
import Layout from "../../components/Layout";
import PostsList from "../../components/PostsList";

export default function SingleTag({ tag }) {
  return (
  <>
    <Layout>
      <h1 className="py-6 text-lg font-bold">{tag.name}</h1>
      <PostsList posts={tag.posts.nodes} />
    </Layout>
  </>
  );
}

export async function getStaticPaths() {
  const GET_TAGSLUG = gql`
    query getTagSlug {
      tags {
        nodes {
          slug
        }
      }
    }
  `;

  const { data } = await client.query({
    query: GET_TAGSLUG,
  });

  return {
    paths: data?.tags.nodes.map((tag) => `/tag/${tag.slug}` ) || [],
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
              sizes
              srcSet
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
    revalidate: 60,
  };
}