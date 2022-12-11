import Image from "next/image";

export default function Thumbnail({ thumbnail, caption }) {
  return (
    <figure className="w-full block">
      <Image
        src={thumbnail.url}
        width={thumbnail.width}
        height={thumbnail.height}
        alt={title}
        layout="responsive"
        quality={80}
        priority
      />
      {caption ? (
        <figcaption className="py-0">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
