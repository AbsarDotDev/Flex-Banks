import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import Navigation from 'components/header/navigation';
import { Suspense } from 'react';
import { SheetSide } from './head-search';
import MobileDrawer from './mobile-drawer';

export default function Header() {
  return (
    <>
      <div
        id="intro"
        className="bg-image object-cover"
        style={{
          backgroundImage: 'url(/hero.jpg)',
          backgroundRepeat: 'no-repeat', // Prevent background image from repeating
          backgroundSize: 'cover', // Adjust the background image size
          backgroundPosition: 'center center',
          height: '600px' // Center the background image
        }}
      >
        <div className="header z-10 w-full text-white">
          <div className="flex w-full items-center justify-between px-6">
            <div className="flex">
              <SheetSide />
              <MobileDrawer />
            </div>
            <div className="py-6">
              <video autoPlay loop muted className="h-20 object-cover">
                <source src="/1080p.webm" type="video/mp4" />
              </video>
            </div>
            <div>
              <div className="flex items-center">
                {/* <User className="w-10" /> */}
                <Suspense fallback={<OpenCart />}>
                  <Cart />
                </Suspense>
              </div>
            </div>
          </div>
          <Navigation hero={true} />
        </div>
      </div>
    </>
  );
}
