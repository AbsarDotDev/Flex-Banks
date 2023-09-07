'use client';
import { Image as img } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles
import { Button } from './ui/button';
interface ProductCardProps {
  title: string;
  amount: string;
  images: img[];
  fimage: string;
}

export function ProductCard({ title, amount, images, fimage }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [carouselActive, setCarouselActive] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCarouselActive(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCarouselActive(false);
  };

  return (
    <div className="relative flex w-1/4 flex-col items-center justify-center">
      <div className="relative">
        <button
          className=""
          type="button"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHovered ? (
            <>
              <Carousel
                infiniteLoop={true}
                showArrows={true}
                showIndicators={false}
                className="w-[300px]"
                selectedItem={carouselActive ? 1 : 0} // Start from the second image if carouselActive is true
              >
                {images?.map((img: img, index: number) => {
                  return (
                    <div key={index}>
                      <Image
                        width={300}
                        height={300}
                        src={`${img.url}`}
                        alt={`Carousel Image ${index + 1}`}
                      />
                    </div>
                  );
                })}
              </Carousel>
              <Button className="absolute bottom-0 left-0 mt-2 w-full rounded-none bg-gray-400 px-4 py-2 text-white">
                Add to Cart
              </Button>
            </>
          ) : (
            <Image src={`${fimage}`} width={300} height={300} alt="asd" />
          )}
        </button>
      </div>
      <div className="text-center">
        <Link href="#" className="">
          <div className="flex flex-col items-center">
            <span className="text-center">{title}</span>
            <p>${amount}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
