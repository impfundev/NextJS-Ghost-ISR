import Image from "next/image";

export default function NextImage({ image, title }) {

  return (
    <div className="relative w-full h-auto">
      <figure className="relative w-96 h-60">
        <Image
          className="object-cover"
          src={image}
          alt={title}
          fill
          layout="responsive"
        />
      </figure>
    </div>
  );
};
