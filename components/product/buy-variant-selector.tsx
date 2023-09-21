'use client';

import clsx from 'clsx';
import { Product, ProductOption, ProductVariant } from 'lib/shopify/types';
import { createUrl } from 'lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useContext, useState } from 'react';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
const tabNames = ['US W', 'US M', 'UK', 'CM', 'KR', 'EU'];
type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean; // ie. { color: 'Red', size: 'Large', ... }
};

export function BuyVariantSelector({
  options,
  variants,
  product
}: {
  options: ProductOption[];
  variants: ProductVariant[];
  product: Product;
}) {
  useContext;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [optionNameLowerCase, setOptionNameLowerCase] = useState<string>('');
  const [optionPrice, setOptionPrice] = useState<string>('');
  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    // Adds key / value pairs for each variant (ie. "color": "Black" and "size": 'M").
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
      {}
    )
  }));
  return options.map((option) => (
    <div className="px-10 py-32">
      <dl className="" key={option.id}>
        <div className="flex flex-col gap-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl">Select Size</h3>
            <h1 className=" text-center text-xl font-bold text-green-800">
              {optionPrice == ''
                ? `${
                    product.priceRange.minVariantPrice.currencyCode +
                    product.priceRange.minVariantPrice.amount
                  }- ${
                    product.priceRange.maxVariantPrice.currencyCode +
                    product.priceRange.maxVariantPrice.amount
                  }`
                : product.priceRange.maxVariantPrice.currencyCode + optionPrice}
            </h1>
          </div>
          <Tabs defaultValue="US W" className="w-full">
            <TabsList className="mb-4 w-full gap-x-4">
              {tabNames.map((tabName) => (
                <TabsTrigger className="w-full text-base" key={tabName} value={tabName}>
                  {tabName}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabNames.map((tabName) => (
              <TabsContent key={tabName} value={tabName}>
                <div className="p-4">
                  <dd className="grid grid-cols-3 gap-x-8 gap-y-4">
                    {option.values
                      .filter((value) => value.toLowerCase().startsWith(tabName.toLowerCase()))
                      .map((value) => {
                        const optionSearchParams = new URLSearchParams(searchParams.toString());
                        optionSearchParams.set(option.name.toLowerCase(), value);
                        const optionUrl = createUrl(pathname, optionSearchParams);
                        const filtered = Array.from(optionSearchParams.entries()).filter(
                          ([key, value]) =>
                            options.find(
                              (option) =>
                                option.name.toLowerCase() === key && option.values.includes(value)
                            )
                        );
                        const isAvailableForSale = combinations.find((combination) =>
                          filtered.every(
                            ([key, value]) =>
                              combination[key] === value && combination.availableForSale
                          )
                        );
                        const isActive = searchParams.get(optionNameLowerCase) === value;
                        const variant = variants.find((variant: ProductVariant) =>
                          variant.selectedOptions.every((option) => option.value === value)
                        );
                        return (
                          <>
                            <Button
                              key={value}
                              aria-disabled={!isAvailableForSale}
                              disabled={!isAvailableForSale}
                              onClick={() => {
                                router.replace(optionUrl, { scroll: false });
                                setOptionNameLowerCase(option.name.toLowerCase());
                                setOptionPrice(`${variant?.price.amount}`);
                              }}
                              title={`${option.name} ${value}${
                                !isAvailableForSale ? ' (Out of Stock)' : ''
                              }`}
                              className={clsx(
                                'flex w-full items-center justify-center rounded-sm border bg-neutral-100 px-4 py-12 text-lg  text-black hover:text-white dark:border-neutral-800 dark:bg-neutral-900',
                                {
                                  'cursor-default ring-1 ring-black': isActive,
                                  'ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-white ':
                                    !isActive && isAvailableForSale,
                                  'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700':
                                    !isAvailableForSale
                                }
                              )}
                            >
                              <div className="flex flex-col">
                                <b> {`${value}`}</b>
                                <p className="text-lg"> {variant?.price.amount}</p>
                              </div>
                            </Button>
                          </>
                        );
                      })}
                  </dd>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </dl>
    </div>
  ));
}
