import probe from "probe-image-size";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import { getSinglePost, getPosts, getMorePosts } from "../lib/api";

import Post from "../components/Post";

export default function SinglePost({ post, relatedPosts, thumbnail }) {
  return (
    <Post
      post={post}
      relatedPosts={relatedPosts}
      thumbnail={thumbnail}
    />
  );
}

export async function getStaticPaths() {
  const posts = await getPosts();

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      }}
    )) || [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const post = await getSinglePost(slug);
  const allPosts = await getMorePosts();
  const relatedPosts = allPosts?.filter((post) => post.slug !== slug);
  const { feature_image } = post;
  let thumbnail = await probe(feature_image, { rejectUnauthorized: false });

  if (!post, !relatedPosts, !thumbnail) {
    return null;
  };

  return {
    props: { post, relatedPosts, thumbnail },
    revalidate: 30,
  };
}
