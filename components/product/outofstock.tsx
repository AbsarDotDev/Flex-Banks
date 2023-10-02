'use client';
import clsx from 'clsx';
import { ProductVariant } from 'lib/shopify/types';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

import { useState } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
function PhoneField() {
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  const [value, setValue] = useState();
  return (
    <PhoneInput
      defaultCountry="FR"
      placeholder="Enter your phone number"
      value={value}
      onChange={() => setValue}
      error={
        value
          ? isValidPhoneNumber(value)
            ? undefined
            : 'Invalid phone number'
          : 'Phone number required'
      }
    />
  );
}
export function PopoverDemo({
  value,
  variant
}: {
  value: string;
  variant: ProductVariant | undefined;
}) {
  function handleSubmit() {}
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          key={value}
          className={clsx(
            'ml-2 mt-1 flex w-[88%] items-center justify-center rounded-sm border bg-neutral-100 px-2 py-10 text-xs text-black hover:text-white dark:border-neutral-800 dark:bg-neutral-900'
            // {
            //   'cursor-default ring-1 ring-black': isActive,
            //   'ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-white ':
            //     !isActive && isAvailableForSale,
            //   'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700':
            //     !isAvailableForSale
            // }
          )}
        >
          <div className="flex flex-col">
            <p className="font-head text-sm font-black"> {`${value}`}</p>
            <p> {variant?.price.currencyCode! + ' ' + variant?.price.amount}</p>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[530px] bg-gray-100">
        <div className="grid gap-4">
          <div className="space-y-3">
            <h1 className="text-[18px] font-black text-black">
              Sorry This Variant Is Not Avaviable Right Now 😓
            </h1>
            <h4 className="text-sm font-medium leading-none text-gray-500">
              Are you interested in this product variant? Request a restocking!
              <br /> We will notify you by number when it is back in stock
            </h4>
          </div>
          <div className="gap-2">
            <label htmlFor="" className="font-head text-xs font-medium">
              Phone Number
            </label>
            <div className="flex w-full">
              <PhoneField />
              <Button onSubmit={handleSubmit} type="submit">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
