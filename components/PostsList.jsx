import { siteUrl } from "../lib/config";

export default function PostsList({ posts }) {
  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-5">
      {posts.map((post) => {
        const { id, title, excerpt, slug, feature_image } = post;
        return (
          <li key={id}><a href={`${siteUrl}/${slug}`}>
            <article className="max-w-sm rounded-2xl shadow-lg overflow-hidden border border-black text-black hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300">
              {feature_image ? (
                <>
                  <img
                    className="w-full object-cover h-60"
                    src={feature_image}
                    alt={title}
                    width="1200"
                    height="850"
                    loading="lazy"
                  />
                </>
              ) : null}
              <div className="grid gap-4 m-5">
                <h2 className="font-bold text-lg md:text-xl pt-1 pb-4">
                  {title}
                </h2>
                <p>{excerpt}</p>
              </div>
            </article>
          </a></li>
        );
      })}
    </ul>
  );
}
