'use client';
import { useStore } from 'app/store';
import { Cart } from 'lib/shopify/types';
import { useRef } from 'react';
function StoreInitializer({ cart }: { cart: Cart | undefined }) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useStore.setState({ cart });
    initialized.current = true;
  }

  return null;
}
export default StoreInitializer;
