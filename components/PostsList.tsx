import { gql } from "@apollo/client";
import { ReactNode } from "react";

import PostCard from "./PostCard";

interface Props {
  [key: string]: any;
};

interface Post {
  post: {
    title: string;
    excerpt: string;
    slug: string;
    featuredImage: {
      node: {
        sourceUrl: string;
        altText: string;
        srcSet: string;
        sizes: string;
      }
    }
  }
};

export default function PostsList({ posts }: Props) {
  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-5">
      {posts.map((post: Post) => {
        return (
          <PostCard post={post} />
        );
      })}
    </ul>
  );
}
