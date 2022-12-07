import featch from "./featch";

async function getFeedsPosts() {
  const data = await featch(`
    query getFeeds {
      posts_list(first: 20) {
        id
        slug
        title
        date
        excerpt
        image {
          url
          width
          height
        }
      }
    }
  `);
  return data.posts_list;
}
export default getFeedsPosts;
