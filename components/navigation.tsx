'use client';
import { useState } from 'react';
import OnHoverMenu from './header/onHoverMenu';

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
      <li className="duration-180 border-b-2 border-transparent py-2 transition hover:border-b-2 hover:border-black">
        About
      </li>
      <li
        className="duration-180 border-b-2 border-transparent py-2 transition hover:border-b-2 hover:border-black"
        onMouseEnter={showList}
        onMouseLeave={hideList}
      >
        Home {isListVisible && <OnHoverMenu />}
      </li>
    </ul>
  );
};

export default Navigation;
