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
    <div key={product.handle} className="relative flex w-full flex-col items-center justify-center">
      <div className="relative w-full">
        <div
          className="relative w-full"
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
                      width={300}
                      height={300}
                      src={`${img.url}`}
                      className="h-full object-cover md:h-[400px]"
                      alt={`Carousel Image ${index + 1}`}
                    />
                  </Link>
                </div>
              );
            })}
          </Carousel>
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
        <Link href={`/product/${product.handle}`} className="">
          <div className="flex flex-col items-center">
            <span className="prd-title text-center">{product.title}</span>
            {OnSale ? (
              <div className="flex flex-row items-center gap-x-2">
                <span className="prd-price text-center">
                  {currencyFormatter.format(Number(product.priceRange.maxVariantPrice.amount))}{' '}
                  {product.priceRange.maxVariantPrice.currencyCode}
                </span>
                <span className=" text-center font-para text-sm text-gray-400 line-through">
                  {currencyFormatter.format(
                    Number(product.compareAtPriceRange.maxVariantPrice.amount)
                  )}{' '}
                  {product.priceRange.maxVariantPrice.currencyCode}
                  <span className="text-red-700"> Sale</span>
                </span>
              </div>
            ) : !isVariableProduct ? (
              <span className="prd-price text-center">
                {currencyFormatter.format(Number(product.priceRange.maxVariantPrice.amount))}{' '}
                {product.priceRange.maxVariantPrice.currencyCode}
              </span>
            ) : (
              <div className="flex items-center gap-x-2">
                <span className="font-para text-xs">From</span>
                <span className="prd-price text-center">
                  {currencyFormatter.format(Number(product.priceRange.minVariantPrice.amount))}
                  {' - '}
                  {currencyFormatter.format(Number(product.priceRange.maxVariantPrice.amount))}{' '}
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
