'use client';
import { Product, Image as img } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles
import { Button } from './ui/button';

export function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div key={product.handle} className="relative flex w-full flex-col items-center justify-center">
      <div className="relative w-full">
        <div
          className="relative w-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link href={`/product/${product.handle}`}>
            <Carousel
              infiniteLoop={true}
              showArrows={isHovered}
              showIndicators={false}
              className="w-full"
            >
              {product.images?.map((img: img, index: number) => {
                return (
                  <div key={index}>
                    <Image
                      width={300}
                      height={300}
                      src={`${img.url}`}
                      className="h-full object-cover md:h-[400px]"
                      alt={`Carousel Image ${index + 1}`}
                    />
                  </div>
                );
              })}
            </Carousel>
          </Link>
          {isHovered && (
            <Button
              className="absolute bottom-8 left-2 right-2 w-auto rounded-none bg-white px-4 py-2 font-para text-black hover:bg-white hover:text-black"
              style={{ zIndex: 1 }}
            >
              Quick Buy
            </Button>
          )}
        </div>
      </div>
      <div className="text-center">
        <Link href="#" className="">
          <div className="flex flex-col items-center">
            <span className="prd-title text-center">{product.title}</span>
            <p className="prd-price">${product.priceRange.maxVariantPrice.amount}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
