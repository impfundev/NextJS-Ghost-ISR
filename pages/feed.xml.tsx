import { gql, useQuery } from "@apollo/client";
import { GetStaticPropsContext } from "next";

import { initializeApollo, addApolloState } from "../lib/TsApolloClient";

interface Post {
  databaseId: number;
  title: string;
};

interface PostEdge {
  node: Post;
};

const POSTS_PER_PAGE = 20;

const GET_POSTS = gql`
  query getPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          databaseId
          title
          slug
          date
          excerpt
          content
        }
      }
    }
  }
`;

export async function getServerSideProps(context: GetStaticPropsContext) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_POSTS,
    variables: {
      first: POSTS_PER_PAGE,
      after: null,
    }
  });

  //Set page headers
  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.write(Feeds(feed));
  res.end();

  return addApolloState(apolloClient, {
    props: {},
  });
}

export default function Feed() {
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: {
      first: POSTS_PER_PAGE,
      after: null,
    }
  });
  const posts = data?.posts?.edges?.map((edge: PostEdge) => edge.node) || [];
  const siteUrl = 'https://fandomnesia-react.vercel.app';
  const feedChild = posts.map((post: Post) => {
    return `<lastBuildDate>${post.date}</lastBuildDate>
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${siteUrl}/${post.slug}</link>
        <pubDate>${post.date}</pubDate>
        <guid isPermaLink="false">${siteUrl}/${post.slug}</guid>
        <description>
          <![CDATA[${post.excerpt}]]>
        </description>
        <content:encoded>
          <![CDATA[${post.content}]]>
        </content:encoded>
      </item>
    `;
  });

  return `<?xml version="1.0" ?>
        <rss
          xmlns:dc="http://purl.org/dc/elements/1.1/"
          xmlns:content="http://purl.org/rss/1.0/modules/content/"
          xmlns:atom="http://www.w3.org/2005/Atom"
          version="2.0"
        >
          <channel>
              <title>Fandomnesia</title>
              <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
              <link>${siteUrl}</link>
              <description>Your site description</description>
              <language>id-ID</language>
              ${feedChild}
          </channel>
        </rss>`;
}
