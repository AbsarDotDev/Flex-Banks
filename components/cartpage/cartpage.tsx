'use client';
import EditItemQuantityButton from 'components/cart/edit-item-quantity-button';
import Price from 'components/price';
import { Button } from 'components/ui/button';
import { DEFAULT_OPTION } from 'lib/constants';
import { Cart } from 'lib/shopify/types';
import { Award, MessageCircle, ShoppingBag, TruckIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import DeleteItemButtonPage from './delete-item-button';
type MerchandiseSearchParams = {
  [key: string]: string;
};

export const CartProductLayout = ({ cart }: { cart: Cart | undefined }) => {
  return (
    <>
      {!cart || cart.lines.length === 0 ? (
        <div className="mt-4 flex w-full flex-col items-center justify-center gap-y-6 overflow-hidden pb-20">
          <ShoppingBag className="h-20 w-20 text-neutral-500 dark:text-neutral-400" />
          <p className="mt-6 text-center text-2xl font-bold">Your cart is sadly empty.</p>
          <Button>
            <Link href="/colletions">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-x-4 md:flex-row lg:flex-row">
          <div className="w-full md:w-3/4 lg:w-3/4">
            <ul className="flex-grow overflow-auto py-4">
              {cart.lines.map((item, i) => {
                const merchandiseSearchParams = {} as MerchandiseSearchParams;

                item.merchandise.selectedOptions.forEach(({ name, value }) => {
                  if (value !== DEFAULT_OPTION) {
                    merchandiseSearchParams[name.toLowerCase()] = value;
                  }
                });

                return (
                  <li
                    key={i}
                    className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                  >
                    <div className="relative flex w-full flex-row justify-between px-1 py-4">
                      <div className="relative cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                        <Image
                          className="h-full w-full object-cover"
                          width={150}
                          height={150}
                          alt={
                            item.merchandise.product.featuredImage.altText ||
                            item.merchandise.product.title
                          }
                          src={item.merchandise.product.featuredImage.url}
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between px-4 text-base">
                        <div>
                          <span className="leading-tight">{item.merchandise.product.title}</span>
                          {item.merchandise.title !== DEFAULT_OPTION ? (
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                              {item.merchandise.selectedOptions[0]!.name +
                                ': ' +
                                item.merchandise.title}
                            </p>
                          ) : null}
                        </div>
                        <Price
                          className="space-y-2 text-sm"
                          amount={item.cost.totalAmount.amount}
                          currencyCode={item.cost.totalAmount.currencyCode}
                        />
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <DeleteItemButtonPage item={item} />

                        <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                          <EditItemQuantityButton item={item} type="minus" />
                          <p className="w-6 text-center">
                            <span className="w-full text-sm">{item.quantity}</span>
                          </p>
                          <EditItemQuantityButton item={item} type="plus" />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-full md:w-1/4 lg:w-1/4">
            <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                <p>Taxes</p>
                <Price
                  className="text-right text-base text-black dark:text-white"
                  amount={cart.cost.totalTaxAmount.amount}
                  currencyCode={cart.cost.totalTaxAmount.currencyCode}
                />
              </div>
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                <p>Shipping</p>
                <p className="text-right">Calculated at checkout</p>
              </div>
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                <p>Total</p>
                <Price
                  className="text-right text-base text-black dark:text-white"
                  amount={cart.cost.totalAmount.amount}
                  currencyCode={cart.cost.totalAmount.currencyCode}
                />
              </div>
            </div>
            <Link
              href={cart.checkoutUrl}
              className="block w-full bg-black p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
            >
              Proceed to Checkout
            </Link>
            <div className="mt-6 bg-gray-100 px-6 py-6">
              <p className="text-center text-xs font-normal">Accepted Payment Methods</p>
              <div className="mt-4 flex flex-row justify-center gap-2">
                <Image src="/visa-icon.svg" width={50} height={50} alt="Visa" />
                <Image src="/amex.svg" width={50} height={50} alt="Apple Pay" />
                <Image src="/mastercard.svg" width={50} height={50} alt="Mastercard" />
                <Image src="/paypal.svg" width={50} height={50} alt="Paypal" />
              </div>
              <div className="mb-6 flex w-full flex-col border-b-2 border-gray-200 pb-4"></div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <TruckIcon className="h-8 w-8" color="gray" strokeWidth={1} />
                  <p className="ml-2 text-xs font-normal ">Free shipping on orders over 200€.</p>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-8 w-8" color="gray" strokeWidth={1} />
                  <p className="ml-2 text-xs font-normal ">International delivery</p>
                </div>
                <div className="flex items-center">
                  <Award className="h-8 w-8" color="gray" strokeWidth={1} />
                  <p className="ml-2 text-xs font-normal ">Authentic products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
