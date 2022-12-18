import Image from "next/image";

export default function NextImage({ image, title }) {

  return (
    <div style={{ position: 'relative', width: '384px', height: '240px' }}>
      <Image
        className="object-cover"
        src={image}
        alt={title}
        fill
        sizes="100vw"
      />
    </div>
  );
};
