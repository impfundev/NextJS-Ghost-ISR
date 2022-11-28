import { gql } from "@apollo/client";
import { client } from "../../lib/apolloClient";
import Layout from "../../components/Layout";
import PostsList from "../../components/PostsList";

export default function SingleCategory({ category }) {
  return (
  <>
    <Layout>
      <h1 className="py-6 text-lg font-bold">{category.name}</h1>
      <PostsList posts={category.posts.nodes} />
    </Layout>
  </>
  );
}

export async function getStaticPaths() {
  const GET_CATSLUG = gql`
    query getCatSlug {
      categories {
        nodes {
          slug
        }
      }
    }
  `;

  const { data } = await client.query({
    query: GET_CATSLUG,
  });

  return {
    paths: data?.categories.nodes.map((category) => `/category/${category.slug}` ) || [],
    fallback: "blocking",
  };
}

const GET_CATEGORY = gql`
  query getCategory($slugId: ID!) {
    category(id: $slugId, idType: SLUG) {
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
    query: GET_CATEGORY,
    variables: { slugId: slug },
  });

  const category = response?.data?.category;

  if (!category) {
    return { notFound: true };
  }

  return {
    props: { category },
    revalidate: 60,
  };
}
