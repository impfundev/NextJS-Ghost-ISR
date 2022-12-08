import { useRouter } from "next/router";
import LazyLoad from "react-lazy-load";
import date from "date-and-time";
import Head from "next/head";

import { getSinglePost, getPostsByTag } from "../lib/api";
import { siteUrl } from "../lib/config";
import Layout from "../components/Layout";
import Share from "../components/Share";
import PostsList from "../components/PostsList";
import AdsRectangle from "../components/AdsRectangle";

export default function SinglePost({ post, related }) {
  const { title, excerpt, html, slug, tags, feature_image, feature_image_caption, updated_at, published_at } = post;
  const haveTags = Boolean(tags?.length);
  const dateFormat = date.format(new Date(`${updated_at ? updated_at : published_at}`), 'DD MMMM YYYY HH:mm');
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
      <LazyLoad threshold={0.95}>
        <AdsRectangle />
      </LazyLoad>
      <article className="prose lg:prose-xl">
        <h1 className="text-2xl md:text-4xl lg:text-6xl">
          {title}
        </h1>
        {feature_image ? (
          <figure className="w-full">
            <img
              className="w-full h-auto object-cover"
              src={feature_image}
              alt={title}
              width="1200"
              height="850"
            />
            {feature_image_caption ? (
              <figcaption className="py-0">{feature_image_caption}</figcaption>
            ) : null}
          </figure>
        ) : null}
        <div className="flex items-center justify-between">
          <span>Oleh: Ilham Maulana</span>
          <Share title={title} slug={slug} />
        </div>
        <p><time className="text-gray-500 text-sm" datetime={updated_at ? updated_at : published_at}>{dateFormat}</time></p>
        <hr />
        {html}
      </article>
      <LazyLoad threshold={0.95}>
        <AdsRectangle />
      </LazyLoad>
      <>
        {haveTags ? (
          <>
          <ul className="m-0 p-0 flex flex-wrap gap-1 list-none py-3">
            {tags.map((tag) => {
              const { id, slug, name } = tag;
              return (
                <li key={id} className="m-0 p-0">
                  <a href={`${siteUrl}/tag/${slug}`} className="px-3 py-1 bg-black text-white text-sm font-bold rounded-full">
                    {name}
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
  const posts = await getPosts();

  return {
    paths: posts.map((post) => ({params: {slug: post.slug}})) || [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const post = await getSinglePost(slug);

  if (!post) {
    return { notFound: true };
  };
  
  const { tags } = post;
  const { tag.slug } = tags.map((tag) => (tag.slug));
  const related = await getPostsByTag(tag.slug);
  if (!related) {
    return null;
  };

  return {
    props: { post, related },
    revalidate: 1,
  };
}
