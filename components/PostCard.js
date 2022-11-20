import parse from "html-react-parser";
import { gql } from "@apollo/client";

export default function PostCard({ post }) {
  const { title, excerpt, slug, featuredImage } = post;

  return (
    <article className="max-w-sm border-t border-inherit">
      <h2 className="font-bold text-lg md:text-xl pt-1 pb-4">
        <a href={`/${slug}`}>
          {title}
        </a>
      </h2>
      <a href={`/${slug}`}>
        <div className="text-gray-700 text-sm md:text-base mb-4">{parse(excerpt)}</div>
        {featuredImage ? (
          <>
            <img
              className="w-full rounded-xl"
              src={featuredImage.node.sourceUrl}
              alt={featuredImage.node.altText}
            />
          </>
        ) : null}
      </a>
    </article>
  );
}
