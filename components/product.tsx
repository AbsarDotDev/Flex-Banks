'use client';
import { Product, Image as img } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles
import { Button } from './ui/button';

export function ProductCard({ product }: { product: Product }) {
  const isVariableProduct: boolean = product.variants.length > 1;
  const OnSale =
    product.compareAtPriceRange.maxVariantPrice.amount > product.priceRange.maxVariantPrice.amount;
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.priceRange.maxVariantPrice.currencyCode
  });

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      key={product.handle}
      className="relative my-8 flex w-full transform flex-col items-center justify-center rounded-xl "
    >
      <div className="relative h-[330px] w-full md:h-[420px]">
        <div
          className="relative h-[330px] w-full cursor-pointer overflow-hidden rounded-xl md:h-[420px]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {' '}
          <Link href={`/product/${product.handle}`}>
            <Carousel
              infiniteLoop={true}
              showArrows={isHovered}
              showIndicators={false}
              selectedItem={isHovered ? 1 : 0}
              className="w-full"
            >
              {product.images?.map((img: img, index: number) => {
                return (
                  <div key={index}>
                    <Image
                      width={335}
                      height={420}
                      src={`${img.url}`}
                      className="h-[420px]"
                      alt={`Carousel Image ${index + 1}`}
                    />
                  </div>
                );
              })}
            </Carousel>
          </Link>
          {!product.availableForSale ? (
            <p className="absolute left-[20%] top-[150px] font-head text-3xl font-black uppercase text-black md:left-[30%] md:top-[180px] md:block">
              SOLD OUT
            </p>
          ) : null}
          {isHovered && (
            <Button
              className="absolute bottom-6 left-5 hidden w-[90%] rounded-none bg-gray-50 px-4 py-2 font-para text-black hover:bg-white hover:text-black md:block"
              style={{ zIndex: 1 }}
            >
              View Product
            </Button>
          )}
        </div>
      </div>
      <div className="w-full px-2 pb-0 pt-4 text-center font-head">
        <Link href={`/product/${product.handle}`} className="">
          <div className="flex flex-col items-start">
            <span className="pb-2 text-left text-[12px] font-extralight uppercase text-gray-500">
              {product.title}
            </span>
            {OnSale ? (
              <div className="flex flex-row items-center gap-x-2">
                <span className="text-center">
                  {currencyFormatter.format(Number(product.priceRange.maxVariantPrice.amount))}{' '}
                  {product.priceRange.maxVariantPrice.currencyCode}
                </span>
                <span className="text-center font-para text-sm text-gray-400 line-through">
                  {currencyFormatter.format(
                    Number(product.compareAtPriceRange.maxVariantPrice.amount)
                  )}{' '}
                  {product.priceRange.maxVariantPrice.currencyCode}
                  <span className="text-red-700"> Sale</span>
                </span>
              </div>
            ) : !isVariableProduct ? (
              <span className="text-center text-[12px] font-black text-black">
                {currencyFormatter.format(Number(product.priceRange.maxVariantPrice.amount))}{' '}
                {/* {product.priceRange.maxVariantPrice.currencyCode} */}
              </span>
            ) : (
              <div className="flex items-center gap-x-2">
                <span className="text-center text-[12px] font-black text-black">
                  {currencyFormatter.format(Number(product.priceRange.minVariantPrice.amount))}
                  {/* {product.priceRange.maxVariantPrice.currencyCode} */}
                </span>
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
