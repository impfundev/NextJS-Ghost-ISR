import { gql } from "@apollo/client";
import { client } from "../lib/apolloClient";

const GET_POSTS = gql`
  query getPosts {
    posts(first: 20, after: null) {
      nodes {
        databaseId
        title
        slug
        date
      }
    }
  }
`;

const response = await client.query({
    query: GET_POSTS,
});

const posts = response.data.posts.nodes;

module.exports = {
    siteTitle: 'example web site',
    siteDescription: 'example web site rss feed',
    siteLanguage: 'en',
    siteCopyright: '©Tadashi Yamazaki',
    siteUrl: 'http://example.com',
    outDir: 'public',
    postsDir: '',
    createFeedItem: ({ posts }) => ({
        title: posts.map((post) => `${post.title}`),
        id: posts.map((post) => `${post.databaseId}`),
        link: posts.map((post) => `${post.slug}`),
        date: new Date(posts.map((post) => `${post.date}`))
    }),
}
