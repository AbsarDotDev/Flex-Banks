'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles
import { Button } from './ui/button';

export function Product() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative">
        <button
          className=""
          type="button"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHovered ? (
            <>
              <Carousel showArrows={true} showIndicators={false} className="w-[300px]">
                <div>
                  <Image width={300} height={300} src="/shirt.jpeg" alt="Carousel Image 1" />
                </div>
                <div>
                  {' '}
                  <Image src="/shirt.jpeg" width={300} height={300} alt="asd" />
                </div>
              </Carousel>
              <Button className="absolute bottom-0 left-0 mt-2 w-full rounded-none bg-gray-400 px-4 py-2 text-white">
                Add to Cart
              </Button>
            </>
          ) : (
            <Image src="/shirt.jpeg" width={300} height={300} alt="asd" />
          )}
        </button>
      </div>
      <div className="text-center">
        <Link href="#" className="">
          <div className="flex flex-col items-center">
            <span className="text-center">Rhinestone Jacket</span>
            <p>Rs. 23,500.00 PKR</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
