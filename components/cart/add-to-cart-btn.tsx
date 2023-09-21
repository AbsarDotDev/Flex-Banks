'use client';

import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import LoadingDots from 'components/loading-dots';
import { Button } from 'components/ui/button';
import { Cart, Product, ProductVariant } from 'lib/shopify/types';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export function AddToCartBtn({
  variants,
  availableForSale,
  product,
  cart
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
  product: Product;
  cart: Cart | undefined;
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
          'text-md relative flex w-full items-center justify-center rounded-none bg-green-600 px-6 py-6 font-bold tracking-wide text-white hover:border-[1px] hover:border-green-600 hover:bg-transparent hover:text-green-600',
          {
            'hover:opacity-50': !availableForSale || !selectedVariantId,
            'cursor-not-allowed': isPending
          }
        )}
      >
        <div className="absolute left-0 ml-4">
          {!isPending ? <></> : <LoadingDots className="mb-3 bg-white" />}
        </div>
        <Link href={`${cart?.checkoutUrl}`}>
          <span className="">{availableForSale ? 'Add To Cart' : 'Out Of Stock'}</span>
        </Link>
      </Button>
    </div>
  );
}
