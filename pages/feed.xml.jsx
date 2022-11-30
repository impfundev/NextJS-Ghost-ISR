import getFeedsPosts from "../lib/getFeedsPosts";
import postsTofeed from "../lib/postsTofeed";
import { siteUrl } from "../lib/config";

const FeedPage = () => null;
function Feeds(feed) {
  const { rssItemsXml, latestPostDate } = feed;
  //   console.log(totalPosts);
  return `<?xml version="1.0" ?>
        <rss
          xmlns:dc="http://purl.org/dc/elements/1.1/"
          xmlns:content="http://purl.org/rss/1.0/modules/content/"
          xmlns:atom="http://www.w3.org/2005/Atom"
          version="2.0"
        >
          <channel>
              <title>Your Site Name</title>
              <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
              <link>${siteUrl}</link>
              <description>Your site description</description>
              <language>en-US</language>
              <lastBuildDate>${new Date(
                latestPostDate
              ).toUTCString()}</lastBuildDate>
              ${rssItemsXml}
          </channel>
        </rss>`;
}
// This gets called on every request
export async function getServerSideProps({ res }) {
  // Fetch data from external API
  const posts = await getFeedsPosts();
  const feed = await postsTofeed(posts);
  //Set page headers
  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  //Set cache for 600s so it wont call our wp on every request.
  res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");
  res.write(Feeds(feed));
  res.end();
  // Pass data to the page via props
  return { props: {} };
}
export default FeedPage;