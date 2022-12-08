import { Tag } from "@tryghost/content-api";
import Head from "next/head";

import { getAllTags, getSingleTag, getPostsByTag } from "../../lib/api";
import { siteUrl } from "../../lib/config";
import Layout from "../../components/Layout";
import PostsList from "../../components/PostsList";

export default function SingleTag({ posts, tag }) {

  return (
  <>
    <Head>
      <title>{tag.name} - Fandomnesia</title>
      <link rel="canonical" href={`${siteUrl}/${tag.slug}`} />
      <meta name="description" content={`Telusuri berita terbaru  serta  konten menarik lainya seputar ${tag.name} di Fandomnesia.`} />
    </Head>
    <Layout>
      <h1 className="py-6 text-lg font-bold">{tag.name}</h1>
      <PostsList posts={posts} />
    </Layout>
  </>
  );
}

export async function getStaticPaths() {
  const tags = await getAllTags();
  const paths = tags.map((tag) => ({
    params: { slug: `/tag/${tag.slug}` },
  }))
  
  return {
    paths || [],
    fallback: "blocking",
  };
}

export async function getStaticProps(params) {
  if (!(params && params.slug && Array.isArray(params.slug))) throw Error('getStaticProps: wrong parameters.');
  const [slug] = params.slug.reverse();
  const tag = await getSingleTag(slug);
  const posts = await getPostsByTag(slug);

  if (!posts) {
    return { notFound: true };
  }

  return {
    props: { posts, tag },
    revalidate: 1,
  };
}
