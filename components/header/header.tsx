import Navigation from 'components/header/navigation';
import Link from 'next/link';
import { CartHeader } from './cart-header';
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
            <div className="w-auto py-2">
              <Link href={'/'}>
                <video autoPlay loop muted className="w-20 object-cover">
                  <source src="/1080p.webm" type="video/mp4" />
                </video>
              </Link>
            </div>
            <div>
              <div className="flex items-center">
                {/* <User className="w-10" /> */}
                {typeof window !== 'undefined' ? <CartHeader /> : <></>}
              </div>
            </div>
          </div>
          <Navigation hero={true} />
        </div>
      </div>
    </>
  );
}
