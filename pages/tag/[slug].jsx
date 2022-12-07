import { gql } from "@apollo/client";
import Head from "next/head";

import { client } from "../../lib/apolloClient";
import { siteUrl } from "../../lib/config";
import Layout from "../../components/Layout";
import PostsList from "../../components/PostsList";

export default function SingleTag({ tag }) {
  return (
  <>
    <Head>
      <title>{tag.name} - Fandomnesia</title>
      <link rel="canonical" href={`${siteUrl}/${tag.slug}`} />
      <meta name="description" content={`Telusuri berita terbaru  serta  konten menarik lainya seputar ${tag.name} di Fandomnesia.`} />
    </Head>
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
      posts_list {
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
  query getTag($slugId: String!) {
    posts_list(where: {categories_every: {slug_contains: $slugId}}) {
      title
      excerpt
      slug
      image {
        url
        width
        height
      }
      categories {
        title
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
