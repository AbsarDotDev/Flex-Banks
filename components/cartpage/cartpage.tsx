'use client';
import EditItemQuantityButton from 'components/cart/edit-item-quantity-button';
import Price from 'components/price';
import { DEFAULT_OPTION } from 'lib/constants';
import { Cart } from 'lib/shopify/types';
import Image from 'next/image';
import DeleteItemButtonPage from './delete-item-button';
type MerchandiseSearchParams = {
  [key: string]: string;
};

export const CartProductLayout = ({ cart }: { cart: Cart | undefined }) => {
  return (
    <>
      <ul className="flex-grow overflow-auto py-4">
        {cart!.lines.map((item, i) => {
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
                        {item.merchandise.selectedOptions[0]!.name + ': ' + item.merchandise.title}
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
    </>
  );
};
