import Head from "next/head";
import parse from "html-react-parser";

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
  
  return {
    paths: tags.map((tag) => ({params: {slug: `${parse(tag.slug)}`}})) || [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const tag = await getSingleTag(slug);
  const tagSlug = slug;
  const posts = await getPostsByTag(tagSlug);

  if (!posts) {
    return { notFound: true };
  }

  return {
    props: { posts, tag },
    revalidate: 1,
  };
}
