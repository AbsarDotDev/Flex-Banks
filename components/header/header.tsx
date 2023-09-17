import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import Navigation from 'components/navigation';
import { Search, User } from 'lucide-react';
import Image from 'next/image';
import logo from 'public/1080p.gif';
import { Suspense } from 'react';
import MobileDrawer from './mobile-drawer';

export default function Header() {
  return (
    <>
      <div
        id="intro"
        className=" bg-image"
        style={{
          backgroundImage:
            'url(https://soleboy.com/cdn/shop/files/DDBC9D99-E43E-4454-8136-8BBACE9DDDDE_1728x.jpg?v=1689060371)',
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
              <Image src={logo} alt="thumbnail" width={50} />
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
