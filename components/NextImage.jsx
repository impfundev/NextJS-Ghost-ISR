import Image from "next/image";
import probe from "probe-image-size";

async function NextImage({ image, title }) {
  let thumbnail = await probe(image, { rejectUnauthorized: false });

  return (
    <Image
      className="object-cover w-full h-60"
      src={thumbnail.url}
      width={thumbnail.width}
      height={thumbnail.height}
      alt={title}
      layout="responsive"
      quality={70}
      sizes={`(max-width: 640px) 480px, (max-width: 1080px) 828px, (max-width: 2048px) 1200px, ${thumbnail.width}px`}
    />
  );
};

export default function NextImage;
