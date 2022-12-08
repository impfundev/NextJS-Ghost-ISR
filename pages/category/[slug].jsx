import { gql } from "@apollo/client";
import Head from "next/head";

import { client } from "../../lib/apolloClient";
import { siteUrl } from "../../lib/config";
import Layout from "../../components/Layout";
import PostsList from "../../components/PostsList";

export default function SingleCategory({ posts, category }) {
  
  return (
  <>
    <Head>
      <title>{category.title} - Fandomnesia</title>
      <link rel="canonical" href={`${siteUrl}/${category.slug}`} />
      <meta name="description" content={`Telusuri berita terbaru  serta  konten menarik lainya seputar ${category.title} di Fandomnesia.`} />
    </Head>
    <Layout>
      <h1 className="py-6 text-lg font-bold">{category.title}</h1>
      <PostsList posts={posts} />
    </Layout>
  </>
  );
}

export async function getStaticPaths() {
  const GET_CATSLUG = gql`
    query getCatSlug {
      posts_list {
        categories {
          slug
        }
      }
    }
  `;

  const { data } = await client.query({
    query: GET_CATSLUG,
  });

  const { post } = data?.posts_list.map((post) => (post));

  return {
    paths: data?.post.categories.[0].map((category) => `/category/${category.slug}` ) || [],
    fallback: "blocking",
  };
}

const GET_CATEGORY = gql`
  query getCategory($slugId: String!) {
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
        slug
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

  const posts = response?.data?.posts_list;
  const { category } = posts.categories.map((category) => (category));

  if (!category) {
    return { notFound: true };
  }

  return {
    props: { posts, category },
    revalidate: 60,
  };
}
