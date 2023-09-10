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
    <ul className="flex items-start justify-center gap-x-20 py-2 text-white ">
      <li>About</li>
      <li onMouseEnter={showList} onMouseLeave={hideList}>
        Home {isListVisible && <OnHoverMenu />}
      </li>
    </ul>
  );
};

export default Navigation;
