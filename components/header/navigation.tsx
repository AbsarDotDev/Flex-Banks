'use client';
import Link from 'next/link';
import { useState } from 'react';
import OnHoverMenu from './on-hover-menu';

const Navigation = () => {
  const [isListVisible, setIsListVisible] = useState(false);

  const showList = () => {
    setIsListVisible(true);
  };

  const hideList = () => {
    setIsListVisible(false);
  };
  return (
    <ul className="flex items-start justify-center gap-x-20 font-head">
      <li className="border-b-2 border-transparent py-2 font-extralight transition duration-700 hover:border-b-2 hover:border-black">
        <Link href={'/collection/shoes'}> Shoes</Link>
      </li>
      <li
        className="border-b-2 border-transparent py-2 transition duration-700 hover:border-b-2 hover:border-black"
        onMouseEnter={showList}
        onMouseLeave={hideList}
      >
        <Link href={'collection/slipper'}>Slipper {isListVisible && <OnHoverMenu />}</Link>
      </li>
      <li className="border-b-2 border-transparent py-2 font-extralight transition duration-700 hover:border-b-2 hover:border-black">
        <Link href={'/collection/shirt'}> Shirt</Link>
      </li>
      <li
        className="border-b-2 border-transparent py-2 font-extralight transition duration-700 hover:border-b-2 hover:border-black"
        onMouseEnter={showList}
        onMouseLeave={hideList}
      >
        <Link href={'collection/slipper'}> Hoodies{isListVisible && <OnHoverMenu />}</Link>
      </li>
    </ul>
  );
};

export default Navigation;
