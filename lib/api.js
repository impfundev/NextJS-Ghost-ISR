import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: process.env.GHOST_PUBLIC_URL,
  key: process.env.GHOST_API_KEY,
  version: 'v5.0'
});

export async function getPosts() {
  return await api.posts
    .browse(
      {
        limit: 'all'
      }
    )
    .catch(err => {
      console.error(err);
    });
}

export async function getIndexPosts() {
  return await api.posts
    .browse(
      {
        limit: 20,
      }
    )
    .catch(err => {
      console.error(err);
    });
}

export async function getSinglePost(postSlug) {
  return await api.posts
    .read(
      {
        include: 'tags,authors',
        slug: postSlug,
      },
      {
        fields: ['id', 'title', 'excerpt', 'html', 'slug', 'tags', 'feature_image', 'feature_image_caption', 'updated_at', 'published_at', 'primary_author', 'primary_tag']
      }
    )
    .catch(err => {
      console.error(err);
    });
}

export async function getAllAuthor() {
  return await api.authors
    .browse({
      include: 'authors',
      limit: 'all'
    })
    .catch(err => {
      console.error(err);
    });
}

export async function getSingleAuthor(authorSlug) {
  return await api.authors
    .read({
      slug: authorSlug,
    })
    .catch(err => {
      console.error(err);
    });
}

export async function getAllTags() {
  return await api.tags
    .browse(
      {
        include: 'tags',
        limit: 'all'
      }
    )
    .catch(err => {
      console.error(err);
    });
}

export async function getSingleTag(tagSlug) {
  return await api.tags
    .read(
      {
        slug: tagSlug
      },
      {
        fields: ['name', 'slug']
      }
    )
    .catch(err => {
      console.error(err);
    });
}

export async function getPostsByTag(tagSlug) {
  return await api.posts
    .read(
      {
        include: 'tags',
        limit: 20,
        filter: `tags.slug:${tagSlug}`
      },
      {
        fields: ['id', 'title', 'excerpt', 'tags', 'slug', 'feature_image']
      }
    )
    .catch(err => {
      console.error(err);
    });
}

export async function getMorePosts() {
  return await api.posts
    .browse(
      {
        limit: 6,
      }
    )
    .catch(err => {
      console.error(err);
    });
}
