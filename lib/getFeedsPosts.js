import featch from "./featch";

async function getFeedsPosts() {
  const data = await featch(`
    query getFeeds {
      posts(first: 20) {
        nodes {
          id
          uri
          title
          date
          excerpt
          featuredImage {
            node {
              sourceUrl(size: POST_THUMBNAIL)
            }
          }
        }
      }
    }
  `);
  return data.posts.nodes;
}
export default getFeedsPosts;
