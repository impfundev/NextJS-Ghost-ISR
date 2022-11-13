import Link from "next/link";
import parse from "html-react-parser";
import { gql } from "@apollo/client";

export default function PostCard({ post }) {
  const { title, excerpt, slug, featuredImage } = post;

  return (
    <article className="max-w-sm rounded overflow-hidden shadow-lg">
      {featuredImage ? (
        <>
          <Link href={slug}>
            <a className="w-full">
              <img
                src={featuredImage.node.sourceUrl}
                alt={featuredImage.node.altText}
              />
            </a>
          </Link>
        </>
      ) : null}
      <h2 className="font-bold text-xl px-6 pt-4 mb-2">
        <Link href={slug}>
          <a>{title}</a>
        </Link>
      </h2>
      <div className="text-gray-700 text-base px-6 pb-4">{parse(excerpt)}</div>
    </article>
  );
}
