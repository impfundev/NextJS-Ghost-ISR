import { gql } from "@apollo/client";
import Head from "next/head";

import { client } from "../../lib/apolloClient";
import { siteUrl } from "../lib/config";
import Layout from "../../components/Layout";
import PostsList from "../../components/PostsList";

export default function SingleCategory({ category }) {
  return (
  <>
    <Head>
      <title>{category.name} - Fandomnesia</title>
      <link rel="canonical" href={`${siteUrl}/${category.slug}`} />
      <meta name="description" content={`Telusuri berita terbaru  serta  konten menarik lainya seputar ${category.name} di Fandomnesia.`} />
    </Head>
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
      slug
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
