import Link from "next/link";
import parse from "html-react-parser";
import { gql } from "@apollo/client";

export default function PostCard({ post }) {
  const { title, excerpt, slug, featuredImage } = post;

  return (
    <article className="max-w-sm border-y border-inherit">
      <h2 className="font-bold text-base md:text-xl px-6 pt-4 mb-2">
        <Link href={`/${slug}`}>
          <a>{title}</a>
        </Link>
      </h2>
      {featuredImage ? (
        <>
          <Link href={`/${slug}`}>
            <a className="w-full rounded-xl">
              <img
                src={featuredImage.node.sourceUrl}
                alt={featuredImage.node.altText}
              />
            </a>
          </Link>
        </>
      ) : null}
      <div className="text-gray-700 text-sm md:text-base px-6 pb-4">{parse(excerpt)}</div>
    </article>
  );
}
