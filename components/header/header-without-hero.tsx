'use client';
import Navigation from 'components/header/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CartHeader } from './cart-header';
import { SheetSide } from './head-search';
import MobileDrawer from './mobile-drawer';

export default function HeaderWithoutHero() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <div
        className={`header top-8 z-[999] w-full bg-gray-100 bg-opacity-80 text-white ${
          isSticky ? 'sticky-header-without-hero' : ''
        }`}
      >
        <div className="flex w-full items-center justify-between px-6">
          <div className="flex gap-x-4">
            <SheetSide isSticky={isSticky} hero={false} />
            <MobileDrawer isSticky={isSticky} hero={false} />
          </div>
          <div className="w-auto px-1 py-6">
            <Link href={'/'}>

              <video className="h-20 w-auto object-cover" autoPlay loop muted playsInline>
                <source src="/1080p.webm" type="video/mp4" />
              </video>
            </Link>
          </div>
          <div>
            <div className="flex items-center">
              {/* <User className="w-10 text-black" /> */}
              <CartHeader isSticky={isSticky} hero={false} />

              {/* <Suspense fallback={<OpenCart />}>
                <Cart />
              </Suspense> */}
            </div>
          </div>
        </div>
        <div className="customnav duration-50 pointer-events-auto hidden bg-white py-2 transition hover:text-black md:block">
          <Navigation hero={false} isSticky={isSticky} />
        </div>
      </div>
    </>
  );
}
