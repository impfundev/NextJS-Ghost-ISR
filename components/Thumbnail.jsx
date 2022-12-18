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
        sizes={`
          (max-width: 600px) 480px,
          (max-width: 700px) 640px,
          (max-width: 1000px) 760px,
          (max-width: 1900px) 1080px,
          (max-width: 2000px) 1200px, ${thumbnail.width}
        `}
      />
      {caption ? (
        <figcaption className="py-0">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
