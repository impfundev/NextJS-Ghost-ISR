import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import date from "date-and-time";
import Head from "next/head";

import { client } from "../../lib/apolloClient";

export const config = { amp: true };

export default function SinglePost({ item }) {
  const { title, excerpt, content, slug, author, featuredImage, categories, tags } = item;
  const haveCategories = Boolean(categories?.nodes?.slice(0, 1).length);
  const haveTags = Boolean(tags?.nodes?.length);
  const dateFormated = date.format(new Date(item.date), 'DD MMMM YYYY HH:mm');

  return (
    <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={parse(excerpt)} />
    </Head>
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
        <button on='tap:sidebar1.toggle'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="menu-icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
        </button>
      </div>
      <amp-sidebar id="sidebar1" layout="nodisplay" side="right">
        <ul>
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
    </header>

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
            <img
              src={featuredImage.node.sourceUrl}
              alt={featuredImage.node.altText}
            />
            {featuredImage.node.caption ? (
              <figcaption>{parse(featuredImage.node.caption)}</figcaption>
            ) : null}
          </figure>
        ) : null}
        <p>
          Oleh: <a href={`/author/${author.node.slug}`}>{author.node.name}</a><br />
          <time className="main-date" datetime={item.date}>{dateFormated}</time>
        </p>
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
        Komentar
      </div>
    </main>
<style jsx global>{`
.header {
position: sticky; 
top: 0; 
background-color: #ffffff;
}

.header-wrapper {
display: flex; 
padding-top: 1rem;
padding-bottom: 1rem; 
padding-left: 1.25rem;
padding-right: 1.25rem; 
justify-content: space-between; 
align-items: center;
}

.logo-wrapper {
display: flex; 
align-items: center; 
gap: 1rem;
}

.logo {
border-radius: 9999px;
}

.site-title {
font-size: 1.125rem;
line-height: 1.75rem; 
font-weight: 700;
}

.menu-icon {
display: inline-block; 
width: 1.5rem; 
height: 1.5rem; 
stroke: currentColor;
}

.main-wrapper {
padding-left: 1.25rem;
padding-right: 1.25rem; 
padding-bottom: 2rem;
}

.category-wrapper {
padding-top: 1rem;
padding-bottom: 1rem;
}

.category {
padding-top: 0.25rem;
padding-bottom: 0.25rem; 
padding-left: 0.75rem;
padding-right: 0.75rem; 
background-color: #000000; 
color: #ffffff; 
font-size: 0.875rem;
line-height: 1.25rem; 
font-weight: 700; 
border-radius: 9999px;
}

/* Main Content */
iframe {
  width: 100%;
  height: auto;
  min-height: 300px;
}

img {
  width: 100%;
  height: auto;
}

.main-title {
font-size: 1.5rem;
line-height: 2rem;
}

@media only screen (min-width: 768px) { 
  .main-title {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }
}

.main-date {
color: #6B7280; 
font-size: 0.875rem;
line-height: 1.25rem;
}

.tag-wrapper {
display: flex; 
padding: 0; 
padding-top: 0.75rem;
padding-bottom: 0.75rem; 
margin: 0; 
list-style-type: none; 
flex-wrap: wrap; 
gap: 0.25rem;
}

.tag-list {
padding: 0; 
margin: 0;
}

.tag {
padding-top: 0.25rem;
padding-bottom: 0.25rem; 
padding-left: 0.75rem;
padding-right: 0.75rem; 
background-color: #000000; 
color: #ffffff; 
font-size: 0.875rem;
line-height: 1.25rem; 
font-weight: 700; 
border-radius: 9999px; 
}

.comment-wrapper {
padding-top: 1.25rem;
padding-bottom: 1.25rem; 
}

/* Typography */

:root {
  --tw-prose-body: #374151;
  --tw-prose-headings: #111827;
  --tw-prose-lead: #4B5563;
  --tw-prose-links: #111827;
  --tw-prose-bold: #111827;
  --tw-prose-counters: #6B7280;
  --tw-prose-bullets: #D1D5DB;
  --tw-prose-hr: #E5E7EB;
  --tw-prose-quotes: #111827;
  --tw-prose-quote-borders: #E5E7EB;
  --tw-prose-captions: #6B7280;
  --tw-prose-th-borders: #D1D5DB;
  --tw-prose-td-borders: #E5E7EB;
}

`}</style>
    </>
  );
}

export async function getStaticPaths() {
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

  return {
    paths: data?.posts.nodes.map((post) => `/${post.slug}/amp`) || [],
    fallback: "blocking",
  };
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
    }
  }
`;

export async function getStaticProps({ params }) {
  const { slug } = params;

  const response = await client.query({
    query: GET_POST,
    variables: { slugId: slug },
  });

  const item = response?.data?.post;

  if (!item) {
    return { notFound: true };
  };

  return {
    props: { item },
    revalidate: 60,
  };
}
