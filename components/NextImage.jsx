import Image from "next/image";

export default function NextImage({ image, title }) {

  return (
    <div className="w-full">
      <figure style={{ position: 'relative', width: '384px', height: '240px' }}>
        <Image
          className="object-cover"
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </figure>
    </div>
  );
};
