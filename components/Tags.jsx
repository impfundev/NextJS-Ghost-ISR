export default function Tags({ tags }) {
  return (
    <ul className="m-0 p-0 flex flex-wrap gap-1 list-none py-3">
      {tags.map((tag) => {
        return (
          <li key={tag.id} className="m-0 p-0">
            <a href={`${siteUrl}/tag/tag.slug}`} className="px-3 py-1 bg-black text-white text-sm font-bold rounded-full">
              {tag.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
