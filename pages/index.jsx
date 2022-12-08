import Head from "next/head";

import Layout from "../components/Layout";
import PostsList from "../components/PostsList";
import { getPosts } from "../lib/api";
import { siteUrl } from "../lib/config";

export async function getStaticProps() {
  const posts = await getPosts();

  if (!posts) {
    return {
      notFound: true,
    }
  }

  return {
    props: { posts },
    revalidate: 1,
  };
}

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Fandomnesia</title>
        <link rel="canonical" href={siteUrl} />
        <meta name="description" content="Fandomnesia.com menyajikan berita terbaru dan konten menarik seputar budaya populer, selebritis, teknologi, dan olahraga." />
      </Head>
      <Layout>
        <PostsList posts={posts} />
      </Layout>
    </>
  );
}
