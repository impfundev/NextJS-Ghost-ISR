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

export async function getAllAuthor() {
  return await api.authors
    .browse({
      include: "authors",
      limit: "all"
    })
    .catch(err => {
      console.error(err);
    });
}

export async function getSingleAuthor(authorSlug) {
  return await api.authors
    .read({
      slug: authorSlug
    })
    .catch(err => {
      console.error(err);
    });
}

export async function getAllTags() {
  return await api.tags
    .browse({
      include: "tags",
      limit: "all"
    })
    .catch(err => {
      console.error(err);
    });
}

export async function getSingleTag(tagSlug) {
  return await api.tags
    .read({
      slug: tagSlug
    })
    .catch(err => {
      console.error(err);
    });
}
