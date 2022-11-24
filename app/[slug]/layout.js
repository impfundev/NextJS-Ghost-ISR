import ampify from "ampify";

export default function Layout({ children }) {
  const html =`<html lang="id">
      <head>
        <title>Next.js</title>

<style amp-custom="amp-custom">{`
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

      </head>
      <body>
        {children}
      </body>
    </html>`

  return ampify(html, {
    cwd: '',
    canonicalURL: '',
  });
}
