import dynamic from "next/dynamic";
import { Suspense } from "react";

const Share = dynamic(() => import("./Share"), {
  suspense: true,
  ssr: false,
});

export default function Author({ author, siteUrl, title, slug }) {
  return (
    <div className="flex items-center justify-between">
      {author ? (
        <>
          <span>Oleh: <a href={`${siteUrl}/author/${author.slug}`}>{author.name}</a></span>
        </>
      ) : null}
      <Share title={title} slug={`${siteUrl}/${slug}`} />
    </div>
  );
}
