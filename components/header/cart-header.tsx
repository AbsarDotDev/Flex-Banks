'use client';
import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import { Suspense } from 'react';

export function CartHeader({ isSticky, hero }: { isSticky: boolean; hero: boolean }) {
  return (
    <Suspense fallback={<OpenCart isSticky={isSticky} hero={hero} />}>
      <Cart isSticky={isSticky} hero={hero} />
    </Suspense>
  );
}
