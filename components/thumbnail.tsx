import Image from 'next/image';
import thumb from 'public/thumbnail.jpg';

export default function Thumbnail() {
  return (
    <div className="thumbnail">
      <Image src={thumb} alt="thumbnail" className="w-full " />
    </div>
  );
}
