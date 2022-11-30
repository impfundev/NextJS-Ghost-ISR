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
          content
        }
      }
    }
  `);
  return data.posts.nodes;
}
export default getFeedsPosts;
