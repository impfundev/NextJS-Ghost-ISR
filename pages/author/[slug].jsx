import { gql } from "@apollo/client";
import Head from "next/head";

import { client } from "../../lib/apolloClient";
import { siteUrl } from "../../lib/config";
import Layout from "../../components/Layout";
import PostsList from "../../components/PostsList";

export default function Author({ user }) {
  return (
  <>
    <Head>
      <title>{user.name} - Fandomnesia</title>
      <link rel="canonical" href={`${siteUrl}/${user.slug}`} />
      <meta name="description" content={`Telusuri berita terbaru  serta  konten menarik lainya dari ${user.name} di Fandomnesia.`} />
    </Head>
    <Layout>
      <h1 className="py-6 text-lg font-bold">By {user.name}</h1>
      <PostsList posts={user.posts.nodes} />
    </Layout>
  </>
  );
}

export async function getStaticPaths() {
  const GET_USERSLUG = gql`
    query getUserSlug {
      users {
        nodes {
          slug
        }
      }
    }
  `;

  const { data } = await client.query({
    query: GET_USERSLUG,
  });

  return {
    paths: data?.users.nodes.map((author) => `/author/${author.slug}` ) || [],
    fallback: "blocking",
  };
}

const GET_USER = gql`
  query getUser($slugId: ID!) {
    user(id: $slugId, idType: SLUG) {
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
              sourceUrl(size: POST_THUMBNAIL)
              altText
              sizes(size: POST_THUMBNAIL)
              srcSet(size: POST_THUMBNAIL)
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
    query: GET_USER,
    variables: { slugId: slug },
  });

  const user = response?.data?.user;

  if (!user) {
    return { notFound: true };
  }

  return {
    props: { user },
    revalidate: 60,
  };
}
