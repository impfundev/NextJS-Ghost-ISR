import { siteUrl } from "./config";

export default async function postsFeed() {
  let latestPostDate = "";
  let rssItemsXml = "";
  blogPosts.forEach((post) => {
    const postDate = Date.parse(post.published_at);
    // Remember to change this URL to your own!
    const postHref = siteUrl + post.slug;
    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.published_at;
    }
    rssItemsXml = `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <link>${postHref}</link>
          <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
          <guid isPermaLink="false">${postHref}</guid>
          <description>
          <![CDATA[${post.excerpt}]]>
          </description>
          <media:content url="${post.feature_image}" type="image/jpg" medium="image" />
          <content:encoded>
            <![CDATA[<img src="${post.feature_image}" width="1200" height="850" alt="${post.title}" />${post.excerpt}]]>
          </content:encoded>
      </item>`;
  });
  return {
    rssItemsXml,
    latestPostDate,
  };
}
