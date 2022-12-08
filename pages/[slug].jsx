import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import LazyLoad from "react-lazy-load";
import date from "date-and-time";
import Head from "next/head";

import { client } from "../lib/apolloClient";
import { siteUrl } from "../lib/config";
import Layout from "../components/Layout";
import Share from "../components/Share";
import PostsList from "../components/PostsList";
import AdsRectangle from "../components/AdsRectangle";

export default function SinglePost({ item, related }) {
  const { title, excerpt, content, slug, image, caption, categories, tags } = item;
  const haveCategories = Boolean(categories?.slice(0, 1).length);
  const haveTags = Boolean(tags?.length);
  const dateFormated = date.format(new Date(item.date), 'DD MMMM YYYY HH:mm');
  const posts = related.filter((posts) => posts.slug !== slug);

  return (
    <>
    <Head>
      <link rel="canonical" href={`${siteUrl}/${slug}`} />
      <script
        dangerouslySetInnerHTML={{
        __html: `let lzAd = false;
          window.addEventListener('scroll', () => {
            (0 != document.documentElement.scrollTop && false === lzAd || 0 != document.body.scrollTop && !1 === lzAd) && (!function(){
              itemScript = document.createElement('script');
              itemScript.src= 'https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v15.0';
              itemScript.async = true;
              itemScript.setAttribute('crossorigin', 'anonymous');
              itemScript.setAttribute('nonce', 'HZqJ51n7');
              itemScript.setAttribute('data-numposts', '5');
              document.head.appendChild(itemScript);
            }(), lzAd = true);
          }, true);`
        }}
      />
    </Head>
    <Layout>
      <>
        {haveCategories ? (
          <>
            {categories.map((category) => {
              const { slug, title } = category;
              return (
                <div className="py-4" key={slug}>
                  <a href={`${siteUrl}/category/${slug}`} className="px-3 py-1 bg-black text-white text-sm font-bold rounded-full">
                    {title}
                  </a>
                </div>
              );
            })}
          </>
        ) : null}
      </>
      <LazyLoad threshold={0.95}>
        <AdsRectangle />
      </LazyLoad>
      <article className="prose lg:prose-xl">
        <h1 className="text-2xl md:text-4xl lg:text-6xl">
          {title}
        </h1>
        {image ? (
          <figure className="w-full">
            <img
              className="w-full h-auto object-cover"
              src={image.url}
              alt={title}
              width={image.width}
              height={image.height}
            />
            {caption ? (
              <figcaption className="py-0">{caption}</figcaption>
            ) : null}
          </figure>
        ) : null}
        <div className="flex items-center justify-between">
          <span>Oleh: Ilham Maulana</span>
          <Share title={title} slug={slug} />
        </div>
        <p><time className="text-gray-500 text-sm" datetime={item.date}>{dateFormated}</time></p>
        <hr />
        {content.html}
      </article>
      <LazyLoad threshold={0.95}>
        <AdsRectangle />
      </LazyLoad>
      <>
        {haveTags ? (
          <>
          <ul className="m-0 p-0 flex flex-wrap gap-1 list-none py-3">
            {tags.map((tag) => {
              const { slug, title } = tag;
              return (
                <li key={slug} className="m-0 p-0">
                  <a href={`${siteUrl}/tag/${title}`} className="px-3 py-1 bg-black text-white text-sm font-bold rounded-full">
                    {title}
                  </a>
                </li>
              );
            })}
          </ul>
          </>
        ) : null}
      </>
      <div className="py-5">
        <div className="fb-comments" data-href={`${siteUrl}/${slug}`} data-width="100%" data-numposts="5"></div>
      </div>
      <div id="fb-root"></div>
      <h3 className="text-xl font-bold py-4">Artikel Terkait</h3>
      <LazyLoad threshold={0.95}>
        <>
          <PostsList posts={posts} />
        </>
      </LazyLoad>
    </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const GET_SLUG = gql`
    query getPosts {
      posts_list {
        slug
      }
    }
  `;

  const { data } = await client.query({
    query: GET_SLUG,
  });

  return {
    paths: data?.posts_list.map((post) => `/${post.slug}`) || [],
    fallback: "blocking",
  };
}

const GET_POST = gql`
  query getPostBySlug($slugId: String!) {
    post(where: {slug: $slugId}) {
      title
      excerpt
      slug
      date
      image {
        url
        width
        height
      }
      caption
      tags {
        title
        slug
      }
      categories {
        title
        slug
      }
      content {
        html
      }
    }
  }
`;

const GET_RELATED = gql`
  query getRelated($catSlug: String!) {
    posts_list(where: {categories_every: {slug_contains: $slugId}}) {
      title
      excerpt
      slug
      image {
        url
        width
        height
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

  const { categories } = item;
  
  const secresponse = await client.query({
    query: GET_RELATED,
    variables: {
      catSlug: categories[0]?.map((category) => (category.slug)),
    },
  });

  const related = secresponse?.data?.posts_list;
  
  if (!related) {
    return null;
  };

  return {
    props: { item, related },
    revalidate: 1,
  };
}
