import Layout from "../components/Layout";

export default function Search() {
  return (
    <>
    <Layout>
      <article className="prose lg:prose-xl">
        <h1 className="text-xl py-6">Temukan Berita atau Konten Menarik yang cari disini</h1>
      <iframe 
        className="rounded-xl border border-black w-full h-96"
        src="https://cse.google.com/cse?cx=e7431585e16a34e4b"
      >
      </iframe>
      </article>
    </Layout>
    </>
  );
}
