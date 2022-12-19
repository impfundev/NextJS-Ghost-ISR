import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import { getIndexPosts } from "../lib/api";
import { siteName, siteUrl, siteDesc } from "../lib/config";

import Layout from "../components/Layout";
import PostsList from "../components/PostsList";

export async function getStaticProps() {
  const posts = await getIndexPosts();
  
  if (!posts) {
    return {
      notFound: true,
    }
  }

  return {
    props: { posts },
    revalidate: 300,
  };
}

export default function Home({ posts, thumbnail }) {
  return (
    <>
        <NextSeo
          title={siteName}
          description={siteDesc}
          canonical={siteUrl}
          openGraph={{
            type: 'website',
            url: siteUrl,
            title: siteName,
            description: siteDesc,
            images: [
              {
                url: `${siteUrl}/favicon.png`,
                width: 150,
                height: 150,
                alt: siteName,
                type: 'image/png',
              }
            ],
            siteName: siteName,
          }}
          twitter={{
            handle: '@fandomnesia_com',
            site: '@fandomnesia_com',
            cardType: 'summary_large_image',
          }}
        />
      <Layout>
        <PostsList
          posts={posts}
        />
      </Layout>
    </>
  );
}
