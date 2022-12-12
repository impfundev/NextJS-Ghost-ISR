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
      quality={70}
    />
  );
};
