import Image from "next/image";
import probe from "probe-image-size";

export default async function NextImage({ image }) {
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
    />
  );
};
