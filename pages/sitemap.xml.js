import { gql } from "@apollo/client";
import { client } from "../lib/apolloClient";

function generateSiteMap({ posts }) {
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>`;

  return (
    <xmlHeader />
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      {posts.map((post) => {
        return (
          <url key={post.slug}>
            <loc>{post.slug}</loc>
          <url>
        );
      })}
    </urlset>
  );
}

const GET_POSTS = gql`
  query getPosts {
    posts {
      nodes {
        slug
      }
    }
  }
`;

function SiteMap() {  }

export async function getServerSideProps({ res }) {
  const response = await client.query({
    query: GET_POSTS,
  });
  const posts = response.data?.posts?.nodes;

  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
