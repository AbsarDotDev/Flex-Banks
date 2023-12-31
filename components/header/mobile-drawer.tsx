'use client';

import { ChevronLeft, ChevronRight, Instagram, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SubImg2 from 'public/submenu2.webp';
import { useState } from 'react';

export default function MobileDrawer({ hero, isSticky }: { hero: boolean; isSticky: boolean }) {
  const [menuLevel, setMenuLevel] = useState('main');
  const [submenuLevel, setSubmenuLevel] = useState('none');
  const [prevMenuLevel, setPrevMenuLevel] = useState('none');
  const [PrevSubmenuLevel, setPrevSubmenuLevel] = useState('none');

  const [isListVisible, setIsListVisible] = useState(false);

  const showList = () => {
    setIsListVisible(true);
  };

  const hideList = () => {
    setIsListVisible(false);
  };

  const goToSubMenu = (submenu: any) => {
    setPrevMenuLevel(menuLevel);

    setPrevSubmenuLevel(submenuLevel);
    setMenuLevel('submenu');
    setSubmenuLevel(submenu);
  };

  const goBack = () => {
    setMenuLevel('main');
    setSubmenuLevel('none');
  };
  return (
    <div className="flex md:hidden">
      <input type="checkbox" id="drawer-toggle" className="peer sr-only relative hidden"></input>
      <label htmlFor="drawer-toggle" className="rounded-lg">
        <Menu className={`${!hero || isSticky ? 'text-black' : 'text-white'}`} />
      </label>
      <div className="fixed left-0 top-0 z-20 h-full w-[80%] -translate-x-full transform bg-white shadow-black backdrop-blur-3xl backdrop-opacity-80 transition-all duration-500 peer-checked:translate-x-0">
        <div className="">
          <label
            htmlFor="drawer-toggle"
            className="flex justify-end border-b-[1px] border-gray-200 px-4 py-3"
          >
            <X className="w-5 text-gray-700" />
          </label>
          <div>
            {menuLevel === 'main' && (
              <ul className="px-4 font-head text-lg uppercase text-gray-800  animate-in slide-in-from-right">
                <li className="py-4">
                  <Link href={'/collection/shoes'}> Shoes</Link>
                </li>
                <li className="py-4">
                  <button
                    className="font-head text-lg uppercase"
                    onClick={() => goToSubMenu('collections')}
                  >
                    Slipper
                    <ChevronRight className="float-right inline-block w-6 pb-[1px]" />
                  </button>
                </li>
                <li className="py-4">
                  <Link href={'/collection/shirt'}> Shirt</Link>
                </li>
                <li className="py-4">
                  <button
                    className="font-head text-lg uppercase"
                    onClick={() => goToSubMenu('collections')}
                  >
                    Hoodies
                    <ChevronRight className="float-right inline-block w-6 pb-[1px]" />
                  </button>
                </li>
                <li className="py-4">
                  <Link href={'#'}>accessories</Link>
                </li>
                <li className="py-4">
                  <Link href={'#'}>shop all</Link>
                </li>
                <li className="py-4">
                  <Link href={'#'}>footwear</Link>
                </li>
                <li className="pt-20">Currency Converter Here</li>
                <li className="pt-8">
                  <Instagram className="w-8 text-gray-800" />
                </li>
              </ul>
            )}
            {menuLevel === 'submenu' && submenuLevel === 'collections' && (
              <div
                className={`${
                  menuLevel === 'submenu'
                    ? 'animate-in slide-in-from-left'
                    : '-translate-x-full duration-300'
                }`}
              >
                <ul className="px-4 font-head text-lg uppercase text-gray-800 ">
                  <li>
                    {' '}
                    <button onClick={goBack} className="absolute top-4">
                      <ChevronLeft className="w-6" />
                    </button>
                  </li>
                  <li className="absolute left-[40%] top-3">Collection</li>
                  <li>
                    <Image src={SubImg2} alt="menu image" />
                  </li>
                  <li className="pt-3 text-center text-sm">explore the archives</li>
                  <li className="py-3 text-center text-2xl">lookbook</li>
                  <li className="py-4">
                    <button className="font-head text-lg uppercase">
                      <Link href={'#'}> Collection 1</Link>
                    </button>
                  </li>
                  <li className="py-4">
                    <button className="font-head text-lg uppercase">
                      <Link href={'#'}> Collection 2</Link>
                    </button>
                  </li>
                  <li className="py-4">
                    <button className="font-head text-lg uppercase">
                      <Link href={'#'}> Collection 3</Link>
                    </button>
                  </li>
                </ul>
              </div>
            )}

            {/* {menuLevel === "submenu" && submenuLevel === "collection1" && (
              // Render submenu for "Collection 1"
            )}

            {menuLevel === "submenu" && submenuLevel === "collection2" && (
              // Render submenu for "Collection 2"
            )}

            {menuLevel === "submenu" && submenuLevel === "collection3" && (
              // Render submenu for "Collection 3"
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
