'use client';

import clsx from 'clsx';
import { ProductOption, ProductVariant } from 'lib/shopify/types';
import { createUrl } from 'lib/utils';
import { ChevronDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../../components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
const tabNames = ['US W', 'US M', 'UK', 'CM', 'KR', 'EU'];
type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean; // ie. { color: 'Red', size: 'Large', ... }
};

export function VariantSelector({
  options,
  variants
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [optionNameLowerCase, setOptionNameLowerCase] = useState<string>('');
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
    <dl className="mb-8" key={option.id}>
      <dt className="mb-4 text-sm uppercase tracking-wide">{option.name}</dt>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full border-[1px] border-black p-2">
          <div className="flex items-center justify-between">
            <p>{option.name}:</p>
            <div className="flex items-center">
              <b>{optionNameLowerCase == '' ? 'All' : searchParams.get(optionNameLowerCase)}</b>{' '}
              <ChevronDown />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="justify-start px-10 py-4">
          <div className="flex flex-col gap-y-8">
            <h3>Sizes and Conversions</h3>
            <Tabs defaultValue="US W" className="w-[400px] ">
              <TabsList className="mb-10 gap-x-4">
                {tabNames.map((tabName) => (
                  <TabsTrigger key={tabName} value={tabName}>
                    {tabName}
                  </TabsTrigger>
                ))}
              </TabsList>
              <DropdownMenuItem className="focus-visible:outline-none">
                <Button
                  onClick={() => {
                    router.replace(pathname, { scroll: false });
                    setOptionNameLowerCase('');
                  }}
                  className="w-full border-[1px] border-gray-300 bg-transparent text-black hover:bg-transparent hover:ring-transparent"
                >
                  All
                </Button>
              </DropdownMenuItem>

              {tabNames.map((tabName) => (
                <TabsContent key={tabName} value={tabName}>
                  <div className="p-4">
                    <dd className="grid grid-cols-3 gap-3">
                      {option.values
                        .filter((value) => value.toLowerCase().startsWith(tabName.toLowerCase()))
                        .map((value) => {
                          // Base option params on current params so we can preserve any other param state in the url.
                          const optionSearchParams = new URLSearchParams(searchParams.toString());

                          // Update the option params using the current option to reflect how the url *would* change,
                          // if the option was clicked.
                          optionSearchParams.set(optionNameLowerCase, value);
                          const optionUrl = createUrl(pathname, optionSearchParams);

                          // In order to determine if an option is available for sale, we need to:
                          //
                          // 1. Filter out all other param state
                          // 2. Filter out invalid options
                          // 3. Check if the option combination is available for sale
                          //
                          // This is the "magic" that will cross check possible variant combinations and preemptively
                          // disable combinations that are not available. For example, if the color gray is only available in size medium,
                          // then all other sizes should be disabled.
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
                          // The option is active if it's in the url params.
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
                                  }}
                                  title={`${option.name} ${value}${
                                    !isAvailableForSale ? ' (Out of Stock)' : ''
                                  }`}
                                  className={clsx(
                                    'flex w-full items-center justify-center rounded-sm border bg-neutral-100 py-6 text-sm  text-black hover:text-white dark:border-neutral-800 dark:bg-neutral-900',
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
                                    <p> {`${variant?.price.amount}`}</p>
                                  </div>
                                </Button>
                              </DropdownMenuItem>
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
      </DropdownMenu>
    </dl>
  ));
}
