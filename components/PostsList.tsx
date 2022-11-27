import { gql } from "@apollo/client";
import { ReactNode } from "react";

import PostCard from "./PostCard";

interface Props {
  [key: string]: any;
};

export default function PostsList({ posts }: Props) {
  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-5">
      {posts.map((post: Props) => {
        return (
          <li key={post.databaseId}>
            <PostCard post={post} />
          </li>
        );
      })}
    </ul>
  );
}
