import { AddToCart } from 'components/cart/add-to-cart-with-buy-now';
import { Product } from 'lib/shopify/types';
import ProductAccordian from './accordian';
import { OutOfStock } from './outofstock';
import RoundVideo from './round-video-btn';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-4 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 pt-6 text-3xl font-medium md:pt-0">{product.title}</h1>
      </div>
      <div className="mb-4 flex h-[55px] items-center gap-x-3 bg-gray-300">
        <img src="/timer.gif" alt="timer" className="w-16 bg-gray-300" />
        <p className="text-lg font-medium">Only {product.totalInventory} left in stock</p>
      </div>
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
          <div className="rounded-none border-[1px] border-gray-400 p-4">
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
