import { Button } from 'components/ui/button';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

export default function UpperFooter() {
  return (
    <div className="flex">
      <div className="w-1/2 px-12 py-20">
        <h2 className="text-3xl font-medium">VISIT THE STORE</h2>
        <h6 className="pt-1 text-sm font-semibold">6420 NW 5th Way, Fort Lauderdale, FL 33309</h6>
        <div className="py-2">
          <p>Mon - Fri, 11am - 6pm</p> <p>Saturday, 11am - 4pm</p> <p>Sunday, CLOSED</p>
        </div>
        <Button className="rounded-none border-[1px] border-black bg-white px-8 py-3 text-sm uppercase text-black">
          <MapPin className="w-5" />
          &nbsp; Directions
        </Button>
      </div>
      <div className="flex w-1/2">
        {' '}
        <Image src="/profile.png" width={50} height={50} alt="Picture of the author" />
        <Image src="/profile.png" width={50} height={50} alt="Picture of the author" />
      </div>
    </div>
  );
}
