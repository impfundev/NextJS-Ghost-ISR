import Image from "next/image";

export default function NextImage({ image, title }) {
  return (
    <figure className="relative w-96 h-60">
      <Image
        className="object-cover"
        src={image}
        alt={title}
        fill
        sizes="10vw"
      />
    </figure>
  );
};
