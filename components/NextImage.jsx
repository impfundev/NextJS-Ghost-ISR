import Image from "next/image";

export default function NextImage({ image, title }) {
  
  return (
    <Image
      className="object-cover w-full h-60"
      src={image}
      width={480}
      height={130}
      alt={title}
      layout="responsive"
      quality={70}
      sizes={`(max-width: 640px) 480px, (max-width: 1080px) 828px, (max-width: 2048px) 1200px, 480px`}
    />
  );
};
