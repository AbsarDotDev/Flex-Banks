'use server';
import { getCart } from 'lib/shopify';
import { Cart } from 'lib/shopify/types';
import { cookies } from 'next/headers';

export async function getCartId(): Promise<Cart | undefined> {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }
  console.log(cart?.cost.totalAmount);
  return cart;
}
