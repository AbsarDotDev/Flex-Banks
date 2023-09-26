import { AddToCart } from 'components/cart/add-to-cart-with-buy-now';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import ProductAccordian from './accordian';
import RoundVideo from './round-video-btn';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-4 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 pt-6 text-4xl font-medium md:pt-0">{product.title}</h1>
      </div>
      <div className="rounded-none border-[1px] border-gray-400 p-4">
        <VariantSelector options={product.options} variants={product.variants} product={product} />

        {product.descriptionHtml ? (
          <Prose
            className="mb-6 text-sm leading-tight dark:text-white/[60%]"
            html={product.descriptionHtml}
          />
        ) : null}
        <AddToCart
          variants={product.variants}
          availableForSale={product.availableForSale}
          product={product}
        />
      </div>
      <RoundVideo />
      <ProductAccordian />
    </>
  );
}
