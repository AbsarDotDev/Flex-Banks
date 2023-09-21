'use client';

import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import LoadingDots from 'components/loading-dots';
import { Button } from 'components/ui/button';
import { Product, ProductVariant } from 'lib/shopify/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export function AddToCart({
  variants,
  availableForSale,
  product
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
  product: Product;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );
  const selectedVariantId = variant?.id || defaultVariantId;
  const title = !availableForSale
    ? 'Out of stock'
    : !selectedVariantId
    ? 'Please select options'
    : undefined;

  return (
    <div className="flex justify-evenly">
      <Button
        aria-label="Add item to cart"
        disabled={isPending || !availableForSale}
        title={title}
        onClick={() => {
          if (!selectedVariantId) {
            const optionSearchParams = new URLSearchParams(searchParams.toString());
            optionSearchParams.set(' ', '');
            router.push(`/buy/${product.handle}`);
            return null;
          } else if (!availableForSale || !selectedVariantId) return;

          startTransition(async () => {
            const error = await addItem(selectedVariantId);

            if (error) {
              // Trigger the error boundary in the root error.js
              throw new Error(error.toString());
            }

            router.refresh();
          });
        }}
        className={clsx(
          'text-md relative mr-2 flex w-full items-center justify-center rounded-none border-[1px] border-black bg-transparent py-5 font-bold tracking-wide text-black hover:bg-gray-400 hover:text-white',
          {
            'hover:opacity-50': !availableForSale || !selectedVariantId,
            'cursor-not-allowed': isPending
          }
        )}
      >
        <div className="absolute left-0 ml-4">
          {!isPending ? <></> : <LoadingDots className="mb-3 bg-white" />}
        </div>
        <span className="">{availableForSale ? 'Add To Bag' : 'Out Of Stock'}</span>
      </Button>
      <Button
        aria-label="Buy Now"
        disabled={isPending || !availableForSale}
        title={title}
        onClick={() => {
          if (!selectedVariantId) {
            const optionSearchParams = new URLSearchParams(searchParams.toString());
            optionSearchParams.set(' ', '');
            router.push(`/buy/${product.handle}`);
            return null;
          } else if (!availableForSale || !selectedVariantId) return;

          startTransition(async () => {
            const error = await addItem(selectedVariantId);

            if (error) {
              // Trigger the error boundary in the root error.js
              throw new Error(error.toString());
            }

            router.refresh();
          });
        }}
        className={clsx(
          'text-md relative ml-2 flex w-full items-center justify-center rounded-none border-[1px] border-green-600 bg-green-600 py-5 font-bold tracking-wide text-white hover:bg-green-400 hover:text-white',
          {
            'hover:opacity-50': !availableForSale || !selectedVariantId,
            'cursor-not-allowed': isPending
          }
        )}
      >
        <div className="absolute left-0 ml-4">
          {!isPending ? <></> : <LoadingDots className="mb-3 bg-white" />}
        </div>
        <span className=" hover:text-black">{availableForSale ? 'Buy Now' : 'Out Of Stock'}</span>
      </Button>
    </div>
  );
}
