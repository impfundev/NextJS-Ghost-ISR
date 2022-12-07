import { siteUrl } from "./config";

export default async function postsTofeed(blogPosts) {
  let latestPostDate = "";
  let rssItemsXml = "";
  blogPosts.forEach((post) => {
    const postDate = Date.parse(post.date);
    // Remember to change this URL to your own!
    const postHref = siteUrl + post.slug;
    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.date;
    }
    rssItemsXml += `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <link>${postHref}</link>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <guid isPermaLink="false">${postHref}</guid>
          <description>
          <![CDATA[${post.excerpt}]]>
          </description>
          <media:content url="${post.image.url}" type="image/jpg" medium="image" />
          <content:encoded>
            <![CDATA[<img src="${post.image.url}" width="${post.image.width}" height="${post.image.height}" alt="${post.title}" />${post.excerpt}]]>
          </content:encoded>
      </item>`;
  });
  return {
    rssItemsXml,
    latestPostDate,
  };
}
