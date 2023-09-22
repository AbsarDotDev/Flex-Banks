import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import Navigation from 'components/navigation';
import { Search, User } from 'lucide-react';
import Image from 'next/image';
import { Suspense } from 'react';
import MobileDrawer from './mobile-drawer';

export default function Header() {
  return (
    <>
      <div
        id="intro"
        className=" bg-image"
        style={{
          backgroundImage: 'url(/hero.jpg)',
          backgroundRepeat: 'no-repeat', // Prevent background image from repeating
          backgroundSize: 'cover', // Adjust the background image size
          backgroundPosition: 'center center',
          height: '600px' // Center the background image
        }}
      >
        <div className="header fixed z-[999] w-full bg-opacity-80 text-white">
          <div className="flex w-full items-center justify-between px-6">
            <div className="flex">
              <MobileDrawer />
              <Search className="w-8" />
            </div>
            <div className="py-6">
              <Image src={'/logo_optimized.gif'} alt="thumbnail" width={100} height={100} />
            </div>
            <div>
              <div className="flex items-center">
                <User className="w-10" />
                <Suspense fallback={<OpenCart />}>
                  <Cart />
                </Suspense>
              </div>
            </div>
          </div>
          <div className="customnav duration-50 pointer-events-auto hidden transition hover:border-b-[2px] hover:border-gray-400 hover:bg-gray-100 hover:text-black md:block">
            <Navigation />
          </div>
        </div>
      </div>
    </>
  );
}
