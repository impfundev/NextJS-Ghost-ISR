import Image from "next/image";

export default function Thumbnail({ thumbnail, caption, title }) {
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
        sizes={`(max-width: 640px) 480px, (max-width: 1080px) 828px, (max-width: 2048px) 1200px, ${thumbnail.width}px`}
      />
      {caption ? (
        <figcaption className="py-0">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
