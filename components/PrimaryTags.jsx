export default function PrimaryTags({ tag, siteUrl }) {
  return (
  <ul className="m-0 p-0 flex flex-wrap gap-1 list-none py-3">
    <li key={tag.slug} className="m-0 p-0">
      <a href={`${siteUrl}/tag/${tag.slug}`} className="px-3 py-1 bg-black text-white text-sm font-bold rounded-full">
        {tag.name}
      </a>
    </li>
  </ul>
  );
}
