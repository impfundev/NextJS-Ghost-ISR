import Layout from "../components/Layout";

export default function Search() {
  return (
    <>
    <Layout>
      <article className="prose lg:prose-xl">
        <h1>Temukan Berita atau Konten Menarik yang cari disini</h1>
        <script async src="https://cse.google.com/cse.js?cx=fd73c201cbd659445"></script>
        <div className="gcse-search"></div>
      </article>
    </Layout>
    </>
  );
}
