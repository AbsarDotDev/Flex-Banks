import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import Navigation from 'components/header/navigation';
import { Search, User } from 'lucide-react';
import { Suspense } from 'react';
import MobileDrawer from './mobile-drawer';

export default function HeaderWithoutHero() {
  return (
    <>
      <div className="header fixed top-10 z-[999] w-full bg-opacity-80 text-white">
        <div className="flex w-full items-center justify-between px-6">
          <div className="flex">
            <MobileDrawer />
            <Search className="w-8" />
          </div>
          <div className="py-6">
            <video autoPlay loop muted className="h-20 w-20 object-cover">
              <source src="/1080p.webm" type="video/mp4" />
            </video>
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
    </>
  );
}
