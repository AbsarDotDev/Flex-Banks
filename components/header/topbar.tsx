'use client';
import 'components/header/TextAnimation.css';
import { Instagram } from 'lucide-react';
import { useEffect, useState } from 'react';

const TopBar = () => {
  const texts = [
    'COMPLIMENTARY SHIPPING ON ORDERS $500+',
    'SHOP THE APP FOR 15% OFF FIRST ORDER',
    'SHIPPING WORLDWIDE'
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Use a transition delay to allow the animation to finish
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="flex h-8 items-center justify-between bg-mycolors-pink px-4">
      <Instagram className="text-white" size={20} />
      <div className="animate__animated animate__fadeInUp animate__faster text-white">
        <p className="text-sm">{texts[currentIndex]}</p>
      </div>

      <p>Currency Converter here</p>
    </div>
  );
};

export default TopBar;
