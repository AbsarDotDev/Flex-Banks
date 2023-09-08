import { Button } from 'components/ui/button';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import footerImage from 'public/footerimg.png';

export default function UpperFooter() {
  return (
    <div className="flex">
      <div className="w-1/2 px-12 pt-20">
        <h2 className="text-3xl font-medium">VISIT THE STORE</h2>
        <h6 className="pt-1 text-sm font-semibold">ENTREPRISE CERTIFIÉE cetified badge</h6>
        <div className="py-2">
          <p>Entrepôt </p> <p>66 Av des champs-Élysées</p> <p>75008 Paris</p>
        </div>
        <Link
          href={
            'https://www.google.com/maps/place/66+Av.+des+Champs-%C3%89lys%C3%A9es,+75008+Paris,+France/@48.8709478,2.3028764,17z/data=!3m1!4b1!4m6!3m5!1s0x47e66fc3c52c6deb:0x9eda90a43280f6b0!8m2!3d48.8709478!4d2.3054513!16s%2Fg%2F11c5ptvxs9?entry=ttu'
          }
        >
          <Button className="rounded-none border-[1px] border-black bg-white px-8 py-3 text-sm uppercase text-black">
            <MapPin className="w-5" />
            &nbsp; Directions
          </Button>
        </Link>
      </div>
      <div className="flex w-1/2">
        {' '}
        <Image src={footerImage} alt="foooter image" className="h-[350px] w-full object-cover" />
      </div>
    </div>
  );
}
