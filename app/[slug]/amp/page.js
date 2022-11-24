'use client';

import { gql } from "@apollo/client";
import parse from "html-react-parser";
import date from "date-and-time";

export async function generateStaticParams() {
  const GET_SLUG = gql`
    query getPosts {
      posts {
        nodes {
          slug
        }
      }
    }
  `;

  const { data } = await client.query({
    query: GET_SLUG,
  });

  return data?.posts.nodes.map((post) => ({
    slug: post.slug,
  }));
}

const GET_POST = gql`
  query getPostBySlug($slugId: ID!) {
    post(id: $slugId, idType: SLUG) {
      title
      date
      slug
      excerpt
      content
      author {
        node {
          name
          slug
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          caption
          sizes
          srcSet
        }
      }
      categories(first: 1) {
        nodes {
          slug
          name
        }
      }
      tags {
        nodes {
          slug
          name
        }
      }
      seo {
        fullHead
      }
    }
  }
`;

async function getData(slug) {
  const client = new ApolloClient({
    uri: 'https://fandomnesia.stellate.sh',
    cache: new InMemoryCache(),
  });
  const response = await client.query({
    query: GET_POST,
    variables: { slugId: slug },
  });
  const item = response?.data?.post;
  if (!item) {
    return null;
  };
  
  return { item };
}

export default async function SinglePost({ params }) {
  const { slug } = params;
  await getData(slug);
  const { title, content, excerpt, slug, author, featuredImage, categories, tags } = item;
  const haveCategories = Boolean(categories?.nodes?.slice(0, 1).length);
  const haveTags = Boolean(tags?.nodes?.length);
  const dateFormated = date.format(new Date(item.date), 'DD MMMM YYYY HH:mm');

  return (
    <>
    <header className="header">
      <div className="header-wrapper">
        <a href="/" className="logo-wrapper">
          <svg className="logo" version="1.0" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 152.000000 152.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,152.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M0 760 l0 -760 760 0 760 0 0 760 0 760 -760 0 -760 0 0 -760z m699 519 c35 -5 107 -30 160 -54 110 -50 168 -63 210 -46 28 12 51 47 51 77 0 25 35 12 38 -14 7 -46 -19 -159 -49 -210 -80 -140 -243 -150 -439 -28 -117 74 -144 86 -185 86 -66 0 -98 -65 -52 -108 12 -11 52 -34 89 -50 79 -36 144 -92 153 -133 l7 -29 124 0 c102 0 124 -3 124 -15 0 -12 -23 -15 -122 -17 l-123 -3 -3 -217 -2 -218 -155 0 -155 0 0 374 c0 344 2 379 20 437 29 97 87 150 183 169 58 11 55 11 126 -1z"/></g>
          </svg>
          <span className="site-title">
            Fandomnesia
          </span>
        </a>
        <button on="tap:sidebar.toggle">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="menu-icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
        </button>
      </div>
    </header>
      <amp-sidebar className="navigasi" id="sidebar" layout="nodisplay" side="right">
        <ul className="menu">
          <li>
            <a href="/">Beranda</a>
          </li>
          <li>
            <a href="/category/budaya-populer">
              Budaya Populer
            </a>
          </li>
          <li>
            <a href="/category/selebritis">
              Selebritis
            </a>
          </li>
          <li>
            <a href="/category/olahraga">
              Olahraga
            </a>
          </li>
          <li>
            <a href="/category/teknologi">
              Teknologi
            </a>
          </li>
        </ul>
      </amp-sidebar>
    <main className="main-wrapper">
      <>
        {haveCategories ? (
          <>
            {categories.nodes.map((category) => {
              const { slug, name } = category;
              return (
                <div className="category-wrapper" key={slug}>
                  <a href={`/category/${slug}`} className="category">
                    {name}
                  </a>
                </div>
              );
            })}
          </>
        ) : null}
      </>
      <article className="prose lg:prose-xl">
        <h1 className="main-title">
          {title}
        </h1>
        {featuredImage ? (
          <figure>
            <amp-img
              src={featuredImage.node.sourceUrl}
              alt={featuredImage.node.altText}
              width="1200"
              height="800"
              layout="responsive"
            ></amp-img>
            {featuredImage.node.caption ? (
              <figcaption>{parse(featuredImage.node.caption)}</figcaption>
            ) : null}
          </figure>
        ) : null}
        <p>
          Oleh: <a href={`/author/${author.node.slug}`}>{author.node.name}</a><br />
          <time className="main-date" datetime={item.date}>{dateFormated}</time>
        </p>
        <div className="social-share">
          <amp-social-share className="share-icon" type="twitter" aria-label="Share on Twitter"></amp-social-share>
          <amp-social-share className="share-icon" type="system" aria-label="Share on Other"></amp-social-share>
        </div>
        <hr />
        {parse(content)}
      </article>
      <>
        {haveTags ? (
          <>
          <ul className="tag-wrapper">
            {tags.nodes.map((tag) => {
              const { slug, name } = tag;
              return (
                <li key={slug} className="tag-list">
                  <a href={`/tag/${slug}`} className="tag">
                    {name}
                  </a>
                </li>
              );
            })}
          </ul>
          </>
        ) : null}
      </>
      <div className="comment-wrapper">
        <a href={slug} className="category">Komentar</a>
      </div>
    </main>
    </>
  );
}
