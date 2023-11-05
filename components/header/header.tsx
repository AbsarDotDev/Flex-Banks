'use client';
import Navigation from 'components/header/navigation';
import $ from 'jquery';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CartHeader } from './cart-header';
import { SheetSide } from './head-search';
import MobileDrawer from './mobile-drawer';
export default function Header() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    // Use useEffect to ensure that the code runs after the DOM is fully loaded
    $(document).ready(function () {
      // Your jQuery code here
      if (!isSticky) {
        $('.customnav').mouseover(function () {
          $(this).addClass('bg-white text-black');
          $('.header').addClass('bg-[#f1f2f4]');
          $('.carticon').addClass('text-black');
          $('.carticon').removeClass('text-white');
          $('.searchicon').addClass('text-black');
          $('.searchicon').removeClass('text-white');
        });

        $('.customnav').mouseout(function () {
          $(this).removeClass('bg-white text-black');
          $('.header').removeClass('bg-[#f1f2f4]');
          $('.carticon').removeClass('text-black');
          $('.carticon').addClass('text-white');
          $('.searchicon').removeClass('text-black');
          $('.searchicon').addClass('text-white');
        });
      }
    });

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
  }, [isSticky]);
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
        <div className={`header z-10 w-full text-white ${isSticky ? 'sticky-header' : ''}`}>
          <div className="flex w-full items-center justify-between px-6 py-8">
            <div className="flex">
              <SheetSide isSticky={isSticky} hero={true} />
              <MobileDrawer />
            </div>
            <div className="w-auto">
              <Link href={'/'}>
                <video autoPlay loop muted className="w-20 object-cover">
                  <source src="/1080p.webm" type="video/mp4" />
                </video>
              </Link>
            </div>
            <div>
              <div className="flex items-center">
                {/* <User className="w-10" /> */}
                {/* @ts-ignore */}
                <CartHeader isSticky={isSticky} hero={true} />
              </div>
            </div>
          </div>
          <div
            className={`customnav duration-50 pointer-events-auto hidden ${
              isSticky ? 'bg-white' : 'bg-transparent'
            } py-2 transition hover:text-black md:block`}
          >
            <Navigation hero={true} isSticky={isSticky} />
          </div>
        </div>
      </div>
    </>
  );
}
