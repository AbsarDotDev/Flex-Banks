import { Cart } from 'lib/shopify/types';
import { create } from 'zustand';

// eslint-disable-next-line no-unused-vars
export const useStore = create<{ cart: Cart | undefined }>((set) => ({
  cart: undefined
}));
