import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: process.env.GHOST_PUBLIC_URL,
  key: process.env.GHOST_API_KEY,
  version: 'v5.0'
});

export async function getPosts() {
  return await api.posts
    .browse({
      limit: 'all'
    });
}

export async function getIndexPosts() {
  return await api.posts
    .browse({
      limit: 20,    
    });
}

export async function getSinglePost(postSlug) {
  return await api.posts
    .read({
      include: 'tags,authors',
      slug: postSlug,
    });
}

export async function getAllAuthor() {
  return await api.authors
    .browse({
      include: 'authors',
      limit: 'all'
    });
}

export async function getSingleAuthor(authorSlug) {
  return await api.authors
    .read({
      slug: authorSlug,
    });
}

export async function getAllTags() {
  return await api.tags
    .browse({
      include: 'tags',
      limit: 'all'
    });
}

export async function getSingleTag(tagSlug) {
  return await api.tags
    .read({
      slug: tagSlug
    });
}

export async function getPostsByTag(tagSlug) {
  return await api.posts
    .browse({
      include: 'tags',
      limit: 20,
      filter: `tags.slug:${tagSlug}`
    });
}

export async function getMorePosts() {
  return await api.posts
    .browse({
      limit: 6,
    });
}
