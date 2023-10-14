'use client';

import clsx from 'clsx';
import { Product, ProductOption, ProductVariant } from 'lib/shopify/types';
import { createUrl } from 'lib/utils';
import { ChevronDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean; // ie. { color: 'Red', size: 'Large', ... }
};

export function VariantSelector({
  options,
  variants,
  product
}: {
  options: ProductOption[];
  variants: ProductVariant[];
  product: Product;
}) {
  var tabNames: string[];
  if (
    product.collections.edges[0]!.node.handle == 'shoes' ||
    product.collections.edges[0]!.node.handle == 'slippers'
  ) {
    tabNames = ['US W', 'US M', 'UK', 'CM', 'KR', 'EU'];
  }

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
    <>
      <dl className="mb-8" key={option.id}>
        <dt className="mb-4 text-sm uppercase tracking-wide">{option.name}</dt>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="relative w-full border-[1px] border-gray-700 p-2">
            <div className="flex items-center justify-between">
              <p>{option.name}:</p>
              <div className="flex items-center">
                <b>{optionNameLowerCase == '' ? 'All' : searchParams.get(optionNameLowerCase)}</b>{' '}
                <ChevronDown />
              </div>
            </div>
          </DropdownMenuTrigger>
          {tabNames !== undefined ? (
            <DropdownMenuContent className="relative justify-start px-4 py-4 md:px-7">
              <div className="flex flex-col gap-y-8">
                <h3>Sizes and Conversions</h3>
                <Tabs defaultValue="US W" className="w-[320px] md:w-[400px] ">
                  <TabsList className="mb-10 flex-wrap gap-x-4 bg-muted">
                    {tabNames.map((tabName) => (
                      <TabsTrigger key={tabName} value={tabName}>
                        {tabName}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <DropdownMenuItem className="focus:bg-transparent focus-visible:outline-none">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        router.replace(pathname, {});
                        setOptionNameLowerCase('');
                        setOptionPrice('');
                      }}
                      className="m-auto w-full transform border-2 bg-transparent transition duration-300 ease-in-out hover:scale-110 hover:bg-black hover:text-white"
                    >
                      All
                    </Button>
                  </DropdownMenuItem>

                  {tabNames.map((tabName) => (
                    <TabsContent key={tabName} value={tabName}>
                      <div className="p-2">
                        <dd className="grid grid-cols-2 md:grid-cols-3">
                          {option.values
                            .filter((value) =>
                              value.toLowerCase().startsWith(tabName.toLowerCase())
                            )
                            .map((value) => {
                              const optionSearchParams = new URLSearchParams(
                                searchParams.toString()
                              );
                              optionSearchParams.set(option.name.toLowerCase(), value);
                              const optionUrl = createUrl(pathname, optionSearchParams);
                              const filtered = Array.from(optionSearchParams.entries()).filter(
                                ([key, value]) =>
                                  options.find(
                                    (option) =>
                                      option.name.toLowerCase() === key &&
                                      option.values.includes(value)
                                  )
                              );
                              const isAvailableForSale = combinations.find((combination) =>
                                filtered.every(
                                  ([key, value]) =>
                                    combination[key] === value && combination.availableForSale
                                )
                              );
                              // console.log(isAvailableForSale);
                              const isActive = searchParams.get(optionNameLowerCase) === value;
                              const variant = variants.find((variant: ProductVariant) =>
                                variant.selectedOptions.every((option) => option.value === value)
                              );
                              return (
                                <>
                                  {!isAvailableForSale ? (
                                    <div className="hidden"></div>
                                  ) : (
                                    <DropdownMenuItem className="w-full focus-visible:outline-none">
                                      <Button
                                        key={value}
                                        // aria-disabled={!isAvailableForSale}
                                        // disabled={!isAvailableForSale}
                                        onClick={() => {
                                          router.replace(optionUrl, { scroll: false });
                                          setOptionNameLowerCase(option.name.toLowerCase());
                                          setOptionPrice(`${variant?.price.amount}`);
                                        }}
                                        title={`${option.name} ${value}${
                                          !isAvailableForSale ? ' (Out of Stock)' : ''
                                        }`}
                                        className={clsx(
                                          'flex w-full items-center justify-center rounded-sm border bg-neutral-100 px-2 py-10 text-xs  text-black hover:text-white dark:border-neutral-800 dark:bg-neutral-900',
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
                                          <p className="font-head text-sm font-black">
                                            {' '}
                                            {`${value}`}
                                          </p>
                                          <p>
                                            {' '}
                                            {variant?.price.currencyCode! +
                                              ' ' +
                                              variant?.price.amount}
                                          </p>
                                        </div>
                                      </Button>
                                    </DropdownMenuItem>
                                  )}
                                </>
                              );
                            })}
                        </dd>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </DropdownMenuContent>
          ) : (
            <DropdownMenuContent className="relative justify-start px-4 py-4 md:px-7">
              <div className="flex flex-col gap-y-8">
                <h3>Sizes and Conversions</h3>

                <DropdownMenuItem className="focus:bg-transparent focus-visible:outline-none">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      router.replace(pathname, {});
                      setOptionNameLowerCase('');
                      setOptionPrice('');
                    }}
                    className="m-auto w-full transform border-2 bg-transparent transition duration-300 ease-in-out hover:scale-110 hover:bg-black hover:text-white"
                  >
                    All
                  </Button>
                </DropdownMenuItem>

                <div className="p-2">
                  <dd className="grid grid-cols-2 md:grid-cols-3">
                    {option.values.map((value) => {
                      // console.log(value);
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
                          <DropdownMenuItem className="w-full focus-visible:outline-none">
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
                                'flex w-full items-center justify-center rounded-sm border bg-neutral-100 px-2 py-10 text-xs  text-black hover:text-white dark:border-neutral-800 dark:bg-neutral-900',
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
                                <p className="font-head text-sm font-black"> {`${value}`}</p>
                                <p> {variant?.price.currencyCode! + ' ' + variant?.price.amount}</p>
                              </div>
                            </Button>
                          </DropdownMenuItem>
                        </>
                      );
                    })}
                  </dd>
                </div>
              </div>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </dl>
      <h1 className="rounded-ful m-auto mb-8 pt-2 text-center text-xl font-bold text-green-800">
        {optionPrice == ''
          ? `${
              product.priceRange.minVariantPrice.currencyCode +
              ' ' +
              product.priceRange.minVariantPrice.amount
            }`
          : product.priceRange.maxVariantPrice.currencyCode + optionPrice}
      </h1>
    </>
  ));
}
