import PostsList from "./PostsList";

export default function MorePost({ posts, thumbnail }) {
  return (
    <>
      <h3 className="text-lg font-bold py-4">Artikel Terbaru</h3>
      <PostsList
        posts={posts}
      />
    </>
  );
}
