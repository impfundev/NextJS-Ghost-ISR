import parse from "html-react-parser";
import { gql } from "@apollo/client";
import { siteUrl } from "../lib/config";

export default function PostsList({ posts }) {
  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-5">
      {posts.map((post) => {
        const { title, excerpt, slug, featuredImage } = post;
        return (
          <li key={slug}><a href={`${siteUrl}/${slug}`}>
            <article className="max-w-sm rounded-2xl shadow-lg overflow-hidden border border-black text-black hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300">
              {featuredImage ? (
                <>
                  <img
                    className="w-full object-cover h-60"
                    src={featuredImage.node.sourceUrl}
                    alt={featuredImage.node.altText}
                    srcSet={featuredImage.node.srcSet}
                    sizes={featuredImage.node.sizes}
                    width="1200"
                    height="800"
                    loading="lazy"
                  />
                </>
              ) : null}
              <div className="grid gap-4 m-5">
                <h2 className="font-bold text-lg md:text-xl pt-1 pb-4">
                  {title}
                </h2>
                {parse(excerpt)}
              </div>
            </article>
          </a></li>
        );
      })}
    </ul>
  );
}
