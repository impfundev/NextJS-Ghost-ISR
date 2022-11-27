import { ApolloClient, createHttpLink, InMemoryCache, gql } from "@apollo/client";
import RSS from 'rss';

const GET_POSTS = gql`
  query getPosts {
    posts(first: 20, after: null) {
      nodes {
        title
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

export async function getServerSideProps({ req, res }) {
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
      credentials: 'same-origin',
      headers: {
        cookie: req.header('Cookie'),
      },
    }),
    cache: new InMemoryCache(),
  });
  const response = await client.query({
    query: GET_POSTS,
  });
  const posts = response.data.posts.nodes;
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
  const results = posts.map((post) => {
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
  await results;

  //Set page headers
  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  //Set cache for 60s so it wont call our wp on every request.
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
  res.write(Feeds(feed));
  res.end();

  return {
    props: {}
  };
}

export default function Feed() {

  return (
    <>
    </>
  );
}
