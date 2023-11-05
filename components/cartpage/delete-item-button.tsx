import { XMarkIcon } from '@heroicons/react/24/outline';
import LoadingDots from 'components/loading-dots';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import { removeItem } from 'components/cart/actions';
import { setCart } from 'components/cart/set-cart';
import type { CartItem } from 'lib/shopify/types';
import { useTransition } from 'react';

export default function DeleteItemButtonPage({ item }: { item: CartItem }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      aria-label="Remove cart item"
      onClick={() => {
        startTransition(async () => {
          const error = await removeItem(item.id);

          if (error) {
            // Trigger the error boundary in the root error.js
            throw new Error(error.toString());
          }
          setCart();

          router.refresh();
        });
      }}
      disabled={isPending}
      className={clsx(
        'ease flex h-[23px] w-[23px] items-center justify-center rounded-full transition-all duration-200',
        {
          'cursor-not-allowed px-0': isPending
        }
      )}
    >
      {isPending ? (
        <LoadingDots className="bg-white" />
      ) : (
        <XMarkIcon className="hover:text-accent-3 mx-[1px] h-8 w-8 text-black dark:text-black" />
      )}
    </button>
  );
}
