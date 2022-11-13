import Layout from "../components/Layout";
import PostsList from "../components/PostsList";

export default function Search() {

  return (
    <Layout>
      <article className="prose lg:prose-xl">
        <h1>Temukan Berita atau Konten Menarik yang cari disini</h1>
        <div className="gcse-search"></div>
        <h2>Artikel Terbaru</h2>
        <PostsList posts={posts} />
        <script async src="https://cse.google.com/cse.js?cx=fd73c201cbd659445"></script>
      </article>
    </Layout>
  );
}
