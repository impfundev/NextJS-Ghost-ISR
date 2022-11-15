import RSS from "rss";
import { gql } from "@apollo/client";
import { client } from "../lib/apolloClient";

const GET_POSTS = gql`
  query getPosts {
    posts(first: 20, after: null) {
      nodes {
        databaseId
        title
        date
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export default function Feed({ posts }) {
  const feed = new RSS({
    title: 'Fandomnesia',
    description: 'Contoh Deskripsi',
    feed_url: 'https://www.fandomnesia.com/feed.xml',
    site_url: 'https://www.fandomnesia.com',
    image_url: 'https://www.fandomnesia.com/favicon.ico',
  });
  
  const { post } = posts.map((post) => (post));

  const siteFeed = feed.item({
    title: post.title,
    description: `<p>${post.excerpt}</p>`,
    url: `https://www.fandomnesia.com/${post.slug}`,
    guid: post.databaseId,
    date: post.date,
  });

  return (
    <>
      {siteFeed}
    </>
  );
}

export async function getStaticProps() {
  const response = await client.query({
    query: GET_POSTS,
  });

  return {
    props: {
      posts: response.data.posts.nodes,
    },
    revalidate: 60,
  };
}
