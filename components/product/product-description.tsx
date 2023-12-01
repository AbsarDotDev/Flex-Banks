'use client';
import { AddToCart } from 'components/cart/add-to-cart-with-buy-now';
import { Product } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import ProductAccordian from './accordian';
import { OutOfStock } from './outofstock';
import RoundVideo from './round-video-btn';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  const optionSearchParams = useSearchParams();
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.priceRange.maxVariantPrice.currencyCode
  });
  return (
    <>
      <div className="mb-4 flex flex-col dark:border-neutral-700">
        <h1 className="mb-3 pt-6 text-xl font-medium text-gray-900 md:pt-0">{product.title}</h1>
        <span className="text-left font-head text-xl font-black text-black">
          {!optionSearchParams.get('size')
            ? currencyFormatter.format(Number(product.priceRange.maxVariantPrice.amount))
            : ''}
          {product.variants.map((variant) =>
            optionSearchParams.get('size') === variant.title
              ? currencyFormatter.format(Number(variant.price.amount))
              : ''
          )}
        </span>
      </div>
      {product.collections.edges[0]!.node.handle == 'shoes' ||
      product.collections.edges[0]!.node.handle == 'slippers' ? (
        <div className="mb-4 flex h-[48px] items-center gap-x-3 bg-gray-300">
          <img src="/timer.gif" alt="timer" className="w-[52px] bg-gray-300" />
          <p className="text-lg font-medium">Only {product.totalInventory} left in stock</p>
        </div>
      ) : (
        <></>
      )}

      <div>
        {!product.availableForSale ? (
          <div>
            <div className="my-6 flex h-16 w-[50%] items-center justify-center bg-black text-center font-head text-lg font-black uppercase text-white">
              out of stock
            </div>
            <div className="rounded-none border-[1px] border-gray-400 p-4">
              <OutOfStock product={product} />
            </div>
          </div>
        ) : (
          <div className="rounded-[5px] border-[1px] border-gray-400 p-6">
            {' '}
            <VariantSelector
              options={product.options}
              variants={product.variants}
              product={product}
            />
            <AddToCart
              variants={product.variants}
              availableForSale={product.availableForSale}
              product={product}
            />
          </div>
        )}
      </div>
      <RoundVideo />
      <ProductAccordian />
    </>
  );
}
