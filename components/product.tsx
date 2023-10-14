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
      <div className="relative h-[420px] w-full">
        <div
          className="relative h-[420px] w-full cursor-pointer overflow-hidden rounded-xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
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
                  <Link href={`/product/${product.handle}`}>
                    <Image
                      width={335}
                      height={420}
                      src={`${img.url}`}
                      className="h-[420px]"
                      alt={`Carousel Image ${index + 1}`}
                    />
                  </Link>
                </div>
              );
            })}
          </Carousel>
          {!product.availableForSale ? (
            <p className="absolute left-[90px] top-[150px] w-auto rounded-none px-4 py-2 font-head text-4xl font-black uppercase text-yellow-300 md:block">
              SOLD
            </p>
          ) : null}
          {isHovered && (
            <Button
              className="absolute bottom-10 left-2 right-2 hidden w-auto rounded-none bg-white px-4 py-2 font-para text-black hover:bg-white hover:text-black md:block"
              style={{ zIndex: 1 }}
            >
              Quick Buy
            </Button>
          )}
        </div>
      </div>
      <div className="py-6 text-center font-head text-2xl md:text-xl">
        <Link href={`/product/${product.handle}`} className="">
          <div className="flex flex-col items-center">
            <span className="h-14 text-center text-[14px] font-bold">{product.title}</span>
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
              <span className="text-center text-[14px]">
                {currencyFormatter.format(Number(product.priceRange.maxVariantPrice.amount))}{' '}
                {product.priceRange.maxVariantPrice.currencyCode}
              </span>
            ) : (
              <div className="flex items-center gap-x-2">
                <span className="text-center text-[14px]">
                  {currencyFormatter.format(Number(product.priceRange.minVariantPrice.amount))}
                  {product.priceRange.maxVariantPrice.currencyCode}
                </span>
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
