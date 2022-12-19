import Image from "next/image";

export default function NextImage({ image, title }) {
  return (
    <Image
      className="object-cover w-full h-60"
      src={image}
      width={1200}
      height={850}
      alt={title}
      layout="responsive"
      sizes={`(max-width: 640px) 480px, (max-width: 1080px) 828px, (max-width: 2048px) 1200px, 1200px`}
    />
  );
};
