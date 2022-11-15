import fs from 'fs';
import RSS from 'rss';
import { gql } from "@apollo/client";

export default async function generateFeed({ posts }) {
  const site_url = 'http://fandomnesia-react.vercel.app';
  
  const feedOptions = {
    // ...
  };
  const feed = new RSS(feedOptions);

  posts.map((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${site_url}/${post.slug}`,
      date: post.date,
    });
  });
 
  fs.writeFileSync('./public/rss.xml', feed.xml({ indent: true }));
}
