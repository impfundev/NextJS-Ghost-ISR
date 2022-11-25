import { gql } from "@apollo/client";
import parse from "html-react-parser";
import date from "date-and-time";
import { useRouter } from "next/router";
import Head from "next/head";

import { client } from "../../lib/apolloClient";

export const config = { amp: true };

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

export async function getStaticProps({ params }) {
  const { slug } = params;
  const response = await client.query({
    query: GET_POST,
    variables: { slugId: slug },
  });
  const item = response?.data?.post;
  if (!item) {
    return null;
  };
  
  return { 
    props: {
      item,
    },
    revalidate: 1,
  };
}

export default function SinglePost({ item }) {
  const { title, excerpt, content, slug, author, featuredImage, categories, tags, seo } = item;
  const haveCategories = Boolean(categories?.nodes?.slice(0, 1).length);
  const haveTags = Boolean(tags?.nodes?.length);
  const dateFormated = date.format(new Date(item.date), 'DD MMMM YYYY HH:mm');

  return (
    <>
    <Head>
      {parse(seo.fullHead)}
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
        {parse(content.replace(/<iframe([^>]*)>/gi, (match) => {
	  return `<amp-iframe width="700" height="300" layout=responsive></amp-iframe>`
	}))}
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
<style jsx global>{`
.header {
position: sticky; 
top: 0; 
background-color: #ffffff;
z-index: 100;
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

.navigasi {
overflow: hidden; 
position: absolute; 
padding-left: 1.25rem;
padding-right: 1.25rem; 
padding-top: 4rem; 
background-color: #ffffff; 
height: 100vh;
}

.menu {
display: flex; 
flex-direction: column; 
justify-content: center; 
align-items: center; 
gap: 1rem;
z-index: 500;
}

.social-share {
display: flex; 
flex-wrap: wrap; 
align-items: center; 
gap: 0.75rem; 
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

.share-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
}

/* Main Content */
iframe {
  width: 100%;
  height: auto;
  min-height: 300px;
}

amp-img img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

figure {
  position: relative;
  width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

button {
  border: 0;
  color: inherit;
  background-color: inherit;
}

.main-title {
font-size: 1.5rem;
line-height: 2rem;
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
  --tw-prose-invert-body: #D1D5DB;
  --tw-prose-invert-headings: #FFFFFF;
  --tw-prose-invert-lead: #9CA3AF;
  --tw-prose-invert-links: #FFFFFF;
  --tw-prose-invert-bold: #FFFFFF;
  --tw-prose-invert-counters: #9CA3AF;
  --tw-prose-invert-bullets: #4B5563;
  --tw-prose-invert-hr: #374151;
  --tw-prose-invert-quotes: #F3F4F6;
  --tw-prose-invert-quote-borders: #374151;
  --tw-prose-invert-captions: #9CA3AF;
  --tw-prose-invert-th-borders: #4B5563;
  --tw-prose-invert-td-borders: #374151;
}

body {
  font-family: sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: var(--tw-prose-body);
}

p {
  margin-top: 16px;
  margin-bottom: 16px;
}

a {
  color: var(--tw-prose-links);
  text-decoration: none;
  font-weight: 500;
}

strong {
  color: var(--tw-prose-bold);
  font-weight: 600;
}

a strong {
  color: inherit;
}

blockquote {
  margin-top: 24px;
  margin-bottom: 24px;
  padding-left: 20px;
}

blockquote strong {
  color: inherit;
}

thead th strong {
  color: inherit;
}

ol {
  margin-top: 16px;
  margin-bottom: 16px;
  padding-left: 22px;
  list-style-type: decimal;
}

ul {
  margin-top: 16px;
  margin-bottom: 16px;
  padding-left: 22px;
  list-style-type: disc;
}

li {
  margin-top: 4px;
  margin-bottom: 4px;
}

ol > li {
  padding-left: 6px;
}

ol > li::marker {
  font-weight: 400;
  color: var(--tw-prose-counters);
}

ul > li {
  padding-left: 6px;
}

ul > li::marker {
  color: var(--tw-prose-bullets);
}

> ul > li p {
  margin-top: 8px;
  margin-bottom: 8px;
}

> ul > li *:first-child {
  margin-top: 16px;
}

> ul > li *:last-child {
  margin-bottom: 16px;
}

> ol > li *:first-child {
  margin-top: 16px;
}

> ol > li *:last-child {
  margin-bottom: 16px;
}

ul ul, ul ol, ol ul, ol ol {
  margin-top: 8px;
  margin-bottom: 8px;
}

hr {
  margin-top: 24px;
  margin-bottom: 24px;
  border-color: var(--tw-prose-hr);
}

hr + * {
  margin-top: 0;
}

h2 + * {
  margin-top: 0;
}

h3 + * {
  margin-top: 0;
}

h4 + * {
  margin-top: 0;
}

blockquote {
  font-weight: 500;
  font-style: italic;
  color: var(--tw-prose-quotes);
  border-left-width: 0.25rem;
  border-left-color: var(--tw-prose-quote-borders);
  quotes: "“" "”" "‘" "’";
}

blockquote p:first-of-type::before {
  content: open-quote;
}

blockquote p:last-of-type::after {
  content: close-quote;
}

h1 {
  font-size: 30px;
  font-weight: 800;
  line-height: 36px;
  color: var(--tw-prose-headings);
  padding-top: 0;
  padding-bottom: 24px;
}

h1 strong {
  font-weight: 900;
  color: inherit;
}

        h2 {
          font-size: 20px;
          margin-top: 32px;
          margin-bottom: 16px;
          line-height: 28px;
          color: var(--tw-prose-headings);
          font-weight: 700;
        }
        h2 strong {
          font-weight: 800;
          color: inherit;
        }
        h3 {
          font-size: 18px;
          margin-top: 28px;
          margin-bottom: 8px;
          line-height: 28px;
          color: var(--tw-prose-headings);
          font-weight: 600;
        }
        h3 strong {
          font-weight: 700;
          color: inherit;
        }
        h4 {
          margin-top: 20px;
          margin-bottom: 8px;
          line-height: 20px;
          color: var(--tw-prose-headings);
          font-weight: 600;
        }
        h4 strong {
          font-weight: 700;
          color: inherit;
        }
        amp-img img {
          margin-top: 24px;
          margin-bottom: 24px;
        }
        figure {
          margin-top: 24px;
          margin-bottom: 24px;
        }
        video {
          margin-top: 24px;
          margin-bottom: 24px;
        }
        figure > * {
          margin-top: 0;
          margin-bottom: 0;
        }
        figcaption {
          font-size: 12px;
          line-height: 16px;
          margin-top: 8px;
          color: var(--tw-prose-captions);
        }
        table {
          font-size: 12px;
          line-height: 18px;
          width: 100%;
          table-layout: auto;
          text-align: left;
          margin-top: 32px;
          margin-bottom: 32px;
        }
        thead {
          border-bottom-width: 1px;
          border-bottom-color: var(--tw-prose-th-borders);
        }
        thead th {
          padding-right: 12px;
          padding-left: 12px;
          padding-bottom: 8px;
          color: var(--tw-prose-headings);
          font-weight: 600;
          vertical-align: bottom;
        }
        thead th:first-child {
          padding-left: 0;
        }
        thead th:last-child {
          padding-right: 0;
        }
        tbody tr {
          border-bottom-width: 1px;
          border-bottom-color: var(--tw-prose-td-borders);
        }
        tbody tr:last-child {
          border-bottom-width: 0;
        }
        tbody td {
          vertical-align: baseline;
        }
        tfoot {
          border-top-width: 1px;
          border-top-color: var(--tw-prose-th-borders);
        }
        tfoot td {
          vertical-align: top;
        }
        tbody td, tfoot td {
          padding-top: 8px;
          padding-right: 12px;
          padding-bottom: 8px;
          padding-left: 12px;
        }
        tbody td:first-child, tfoot td:first-child {
          padding-left: 0;
        }
        tbody td:last-child, tfoot td:last-child {
          padding-right: 0;
        }
        > :first-child {
          margin-top: 0;
        }
        > :last-child {
          margin-bottom: 0;
        }
`}</style>
    </>
  );
}
