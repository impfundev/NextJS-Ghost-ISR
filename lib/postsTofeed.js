export default async function postsTofeed(blogPosts) {
  let latestPostDate = "";
  let rssItemsXml = "";
  blogPosts.forEach((post) => {
    const postDate = Date.parse(post.date);
    // Remember to change this URL to your own!
    const postHref = process.env.NEXT_PUBLIC_BASE_URL + post.uri;
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
          <content:encoded>
            <![CDATA[${post.content}]]>
          </content:encoded>
      </item>`;
  });
  return {
    rssItemsXml,
    latestPostDate,
  };
}
