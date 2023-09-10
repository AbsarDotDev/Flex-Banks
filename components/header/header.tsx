import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import Navigation from 'components/navigation';
import Image from 'next/image';
import logo from 'public/1080p.gif';
import { Suspense } from 'react';

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
        <div className="mask fixed z-[999] w-full bg-opacity-80 py-2 text-white hover:bg-gray-400">
          <div className="flex w-full items-center justify-between px-6">
            <div>
              {' '}
              <h1>Search Bar</h1>
            </div>
            <div>
              <Image src={logo} alt="thumbnail" width={50} />
            </div>
            <div>
              <div>
                <Suspense fallback={<OpenCart />}>
                  <Cart />
                </Suspense>
              </div>
            </div>
          </div>
          <div>
            <Navigation />
          </div>
        </div>
      </div>
    </>
  );
}
