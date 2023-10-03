'use client';
import clsx from 'clsx';
import { Product, ProductVariant } from 'lib/shopify/types';
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
  variant,
  product
}: {
  value: string;
  variant: ProductVariant | undefined;
  product: Product;
}) {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        message: `Hello, I'm interested in product variant: ${value} of product: ${product.title} `
      })
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          key={value}
          className={clsx(
            'ml-2 mt-1 flex w-[88%] items-center justify-center rounded-sm border bg-neutral-100 px-2 py-10 text-xs text-black hover:text-white dark:border-neutral-800 dark:bg-neutral-900'
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
            <form onSubmit={handleSubmit}>
              <label htmlFor="" className="font-head text-xs font-medium">
                E-mail
              </label>
              <div className="flex w-full">
                {/* <PhoneField /> */}
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-[80%] rounded-sm border border-gray-300 px-2 py-1 text-sm focus:border-transparent focus:ring-2 focus:ring-black"
                />
                <Button className="ml-1 w-[20%]" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
