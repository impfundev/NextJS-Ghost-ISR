import parse from "html-react-parser";
import { gql } from "@apollo/client";

export default function PostCard({ post }) {
  const { title, excerpt, slug, featuredImage } = post;

  return (
  <li key={slug}>
    <article className="max-w-sm rounded-2xl shadow-lg overflow-hidden border border-black text-black hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300">
      <a className="relative" href={`/${slug}`} aria-label={title}>
        {featuredImage ? (
          <>
            <img
              className="w-full object-cover h-60"
              src={featuredImage.node.sourceUrl}
              alt={featuredImage.node.altText}
              srcSet={featuredImage.node.srcSet}
              sizes={featuredImage.node.sizes}
            />
          </>
        ) : null}
      </a>
      <div className="grid gap-4 m-5">
        <h2 className="font-bold text-lg md:text-xl pt-1 pb-4">
          <a href={`/${slug}`}>
            {title}
          </a>
        </h2>
        <a href={`/${slug}`}>{parse(excerpt)}</a>
      </div>
    </article>
  </li>
  );
}
