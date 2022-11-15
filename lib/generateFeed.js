import fs from 'fs';
import RSS from 'rss';
import { gql } from "@apollo/client";

export default async function generateFeed({ posts }) {
  const siteUrl = 'http://fandomnesia-react.vercel.app';
  
  const feedOptions = {
    title: 'Fandomnesia',
    description: 'Fandomnesia.com menyajikan berita terbaru dan konten menarik seputar budaya populer, selebritis, teknologi, dan olahraga.',
    site_url: siteUrl,
    image_url: `${siteUrl}/favicon.ico`,
    categories: ['Budaya Populer','Selebritis','Olahraga','Teknologi'],
    pubDate: posts.map((post) => (post.date)).slice(0,1),
    custom_namespaces: {
      'xmlns:media': 'http://search.yahoo.com/mrss'
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
            url: post.featuredImage?.node.sourceUrl || `${siteUrl}/favicon.ico`,
            type: 'image/jpeg',
            medium: 'image',
          }
        }},
      ],
    });
  });
 
  fs.writeFileSync('./public/feed.xml', feed.xml({ indent: true }));
}
