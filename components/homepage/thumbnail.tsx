import Image, { StaticImageData } from 'next/image';
interface ImageComponentProps {
  imageUrl: StaticImageData;
}
export default function Thumbnail({ imageUrl }: ImageComponentProps) {
  return (
    <div className="thumbnail">
      <Image src={imageUrl} alt="thumbnail" className="w-full " />
    </div>
  );
}
