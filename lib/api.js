import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: 'https://demo.ghost.io',
  key: '22444f78447824223cefc48062',
  version: "v5.0"
});

export async function getPosts() {
  return await api.posts
    .browse({
      include: "tags,authors",
      limit: "all"
    })
    .catch(err => {
      console.error(err);
    });
}

export async function getSinglePost(postSlug) {
  return await api.posts
    .read({
      slug: postSlug
    })
    .catch(err => {
      console.error(err);
    });
}

export async function getAuthor(authorSlug) {
  return await api.authors
    .read({
      slug: authorSlug
    })
    .catch(err => {
      console.error(err);
    });
}

export async function getAllTags(tagSlug) {
  return await api.tags
    .read({
      slug: tagSlug
    })
    .catch(err => {
      console.error(err);
    });
}
