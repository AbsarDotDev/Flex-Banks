'use client';

import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import LoadingDots from 'components/loading-dots';
import { Button } from 'components/ui/button';
import { Product, ProductVariant } from 'lib/shopify/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export function AddToCartBtn({
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
        aria-label="Add to cartt"
        disabled={isPending || !availableForSale || !selectedVariantId}
        title={title}
        onClick={() => {
          if (!availableForSale || !selectedVariantId) return;
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
          'text-md relative mr-2 flex w-full items-center justify-center rounded-lg bg-green-600 py-5 font-bold tracking-wide text-white hover:bg-gray-400 hover:text-white',
          {
            'hover:opacity-50': !availableForSale || !selectedVariantId,
            'cursor-not-allowed': isPending
          }
        )}
      >
        <div className="absolute left-0 ml-4">
          {!isPending ? <></> : <LoadingDots className="mb-3 bg-white" />}
        </div>
        <span className="">{availableForSale ? 'Add To Cart' : 'Out Of Stock'}</span>
      </Button>
    </div>
  );
}
