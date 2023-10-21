import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import { Suspense } from 'react';

export function CartHeader() {
  return (
    <Suspense fallback={<OpenCart />}>
      <Cart />
    </Suspense>
  );
}
