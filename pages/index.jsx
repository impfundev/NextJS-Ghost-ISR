import { NextSeo } from "next-seo";

import Layout from "../components/Layout";
import PostsList from "../components/PostsList";
import { getPosts } from "../lib/api";
import { siteName, siteUrl, siteDesc } from "../lib/config";

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
        <PostsList posts={posts.slice(0,20)} />
      </Layout>
    </>
  );
}
