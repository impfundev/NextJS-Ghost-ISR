import LazyLoad from "react-lazy-load";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const PostsList = dynamic(() => import("./PostsList"), {
  suspense: true,
});

export default function MorePost({ posts }) {
  return (
    <>
      <h3 className="text-lg font-bold py-4">Artikel Terbaru</h3>
      <LazyLoad threshold={0.95}>
        <PostsList posts={posts} />
      </LazyLoad>
    </>
  );
}
