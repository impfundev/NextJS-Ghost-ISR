import fs from 'fs';
import RSS from 'rss';
import { gql } from '@apollo/client';

export default async function generateFeed({ posts }) {
  const siteUrl = 'https://fandomnesia-react.vercel.app';
  
  const feedOptions = {
    title: 'Fandomnesia',
    description: 'Fandomnesia.com menyajikan berita terbaru dan konten menarik seputar budaya populer, selebritis, teknologi, dan olahraga.',
    feed_url: `${siteUrl}/feed.xml`,
    site_url: siteUrl,
    image_url: `${siteUrl}/favicon.jpg`,
    categories: ['Budaya Populer','Selebritis','Olahraga','Teknologi'],
    custom_namespaces: {
      'media': 'http://search.yahoo.com/mrss/'
    },
  };
  const feed = new RSS(feedOptions);

  posts.map((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/${post.slug}`,
      date: post.date,
      custom_elements: [
        {'media:content': {
          _attr: {
            url: post.featuredImage?.node.sourceUrl || `${siteUrl}/favicon.jpg`,
            type: 'image/jpeg',
            medium: 'image',
          }
        }},
      ],
    });
  });
 
  fs.writeFileSync('./public/feed.xml', feed.xml({ indent: true }));
}
