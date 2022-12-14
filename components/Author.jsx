import Share from "./Share";

export default function Author({ author, siteUrl, title, slug }) {
  return (
    <div className="flex items-center justify-between">
      <span>Oleh: <a href={`${siteUrl}/author/${author.slug}`}>{author.name}</a></span>
      <Share title={title} slug={`${siteUrl}/${slug}`} />
    </div>
  );
}
