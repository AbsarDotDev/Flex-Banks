import clsx from 'clsx';
import { ShoppingBasket } from 'lucide-react';

export default function OpenCart({
  className,
  quantity,
  isSticky,
  hero
}: {
  className?: string;
  quantity?: number;
  isSticky: boolean;
  hero: boolean;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-transparent text-white transition-colors dark:border-neutral-700 dark:text-white">
      <ShoppingBasket
        className={clsx(
          `h-12 ${
            !hero || isSticky ? 'text-black' : 'text-white'
          } carticon transition-all ease-in-out hover:scale-110`,
          className
        )}
      />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-1 -mt-1 h-4 w-4 items-center rounded-full bg-gray-600 text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
