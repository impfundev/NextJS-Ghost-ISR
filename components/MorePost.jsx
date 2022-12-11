import LazyLoad from "react-lazy-load";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import PostsList from "./PostsList";

export default function MorePost({ posts, thumbnail }) {
  return (
    <>
      <h3 className="text-lg font-bold py-4">Artikel Terbaru</h3>
      <LazyLoad threshold={0.95}>
        <PostsList
          posts={posts}
          thumbnail={thumbnail}
        />
      </LazyLoad>
    </>
  );
}
