import Link from "next/link";
import parse from "html-react-parser";
import { gql } from "@apollo/client";

export default function PostCard({ post }) {
  const { title, excerpt, slug, featuredImage } = post;

  return (
    <article className="max-w-sm border-t border-inherit">
      <h2 className="font-bold text-lg md:text-xl pb-4">
        <Link href={`/${slug}`}>
          <a>{title}</a>
        </Link>
      </h2>
      <div className="text-gray-700 text-sm md:text-base mb-4">{parse(excerpt)}</div>
      {featuredImage ? (
        <>
          <Link href={`/${slug}`}>
            <a>
              <img
                className="w-full rounded-xl"
                src={featuredImage.node.sourceUrl}
                alt={featuredImage.node.altText}
              />
            </a>
          </Link>
        </>
      ) : null}
    </article>
  );
}
