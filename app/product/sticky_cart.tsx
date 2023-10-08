'use client';

import { Button } from 'components/ui/button';
import { Product } from 'lib/shopify/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ScrollToTopButton = ({ product }: { product: Product }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // if the user scrolls down, show the button
      window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false);
    };
    // listen for scroll events
    window.addEventListener('scroll', toggleVisibility);

    // clear the listener on component unmount
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // handles the animation when scrolling to the top
  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
  };
  function truncateTitle(title: string, wordLimit: number) {
    // Split the title into words
    const words = title.split(' ');

    // Check if the number of words exceeds the limit
    if (words.length > wordLimit) {
      // Take the first three words and add "..."
      return words.slice(0, wordLimit).join(' ') + '...';
    } else {
      // If the title has fewer than 3 words, return it as is
      return title;
    }
  }

  return (
    <div
      className={`fixed bottom-4 right-4 flex w-[90%] items-center justify-around gap-x-6 rounded-md bg-white p-2 shadow-lg outline-none transition-opacity duration-200 md:w-[350px] md:justify-between ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Image
        src={product.featuredImage.url}
        height={50}
        width={80}
        className="h-[70px] w-[80px] object-cover"
        alt={product.handle}
      />
      <div className="flex flex-col">
        <p className="font-head text-[15px]">{truncateTitle(product.title, 3)}</p>
        <p className="font-head text-[13px] font-light">
          From{' '}
          {product.priceRange.minVariantPrice.currencyCode +
            product.priceRange.minVariantPrice.amount}
        </p>
      </div>
      <Button variant={'default'} className={''} onClick={scrollToTop}>
        Select
      </Button>
    </div>
  );
};

export default ScrollToTopButton;
