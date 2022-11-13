import { gql } from "@apollo/client";

import PostCard from "./PostCard";

export default function PostsList({ posts }) {
  return (
    <ul className="grid md:grid-cols-3 gap-4 py-6">
      {posts.map((post) => {
        return (
          <li key={post.databaseId}>
            <PostCard post={post} />
          </li>
        );
      })}
    </ul>
  );
}
