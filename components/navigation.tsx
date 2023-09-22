'use client';
import { useState } from 'react';
import OnHoverMenu from './header/on-hover-menu';

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
        About
      </li>
      <li
        className="border-b-2 border-transparent py-2 transition duration-700 hover:border-b-2 hover:border-black"
        onMouseEnter={showList}
        onMouseLeave={hideList}
      >
        Home {isListVisible && <OnHoverMenu />}
      </li>
    </ul>
  );
};

export default Navigation;
