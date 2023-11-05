'use client';
import Link from 'next/link';
import { useState } from 'react';
import OnHoverMenu from './on-hover-menu';

const Navigation = ({ hero, isSticky }: { hero: boolean; isSticky: boolean }) => {
  const [isListVisible, setIsListVisible] = useState(false);

  const showList = () => {
    setIsListVisible(true);
  };

  const hideList = () => {
    setIsListVisible(false);
  };
  return (
    <div className="customnav duration-10 pointer-events-auto hidden transition hover:bg-white hover:text-black md:block">
      <ul className="flex items-start justify-center gap-x-20 font-head">
        <li className="border-b-2 border-transparent py-2 font-extralight transition duration-700 hover:border-b-2 hover:border-black">
          <Link
            href={'/collection/shoes'}
            className={`${!hero || isSticky ? 'text-black' : 'navlink'}`}
          >
            {' '}
            Shoes
          </Link>
        </li>
        <li
          className="border-b-2 border-transparent py-2 transition duration-700 hover:border-b-2 hover:border-black"
          onMouseEnter={showList}
          onMouseLeave={hideList}
        >
          <Link
            href={'collection/slipper'}
            className={`${!hero || isSticky ? 'text-black' : 'navlink'}`}
          >
            Slipper {isListVisible && <OnHoverMenu />}
          </Link>
        </li>
        <li className="border-b-2 border-transparent py-2 font-extralight transition duration-700 hover:border-b-2 hover:border-black">
          <Link
            href={'/collection/shirt'}
            className={`${!hero || isSticky ? 'text-black' : 'navlink'}`}
          >
            {' '}
            Shirt
          </Link>
        </li>
        <li
          className="border-b-2 border-transparent py-2 font-extralight transition duration-700 hover:border-b-2 hover:border-black"
          onMouseEnter={showList}
          onMouseLeave={hideList}
        >
          <Link
            href={'collection/slipper'}
            className={`${!hero || isSticky ? 'text-black' : 'navlink'}`}
          >
            {' '}
            Hoodies{isListVisible && <OnHoverMenu />}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
