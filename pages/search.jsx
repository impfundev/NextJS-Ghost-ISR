import Layout from "../components/Layout";

export default function Search() {
  return (
    <>
    <Layout>
      <article className="prose lg:prose-xl">
        <h1 className="text-xl py-6">Temukan Berita atau Konten Menarik yang cari disini</h1>
        <div className="gcse-searchbox-only"></div>
      </article>
    </Layout>
    <script async src="https://cse.google.com/cse.js?cx=e7431585e16a34e4b"></script>
    </>
  );
}
