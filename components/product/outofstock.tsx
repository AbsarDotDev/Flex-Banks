'use client';
import { Product } from 'lib/shopify/types';
import { Button } from '../ui/button';

import { useState } from 'react';

export function OutOfStock({ product }: { product: Product }) {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        message: `Hello, I'm interested in product ${product.title} `
      })
    });
  };
  return (
    <>
      <div className="grid gap-4">
        <div className="space-y-3">
          <h1 className="text-[21px] font-black text-black">
            Sorry This Product Is Not Avaviable Right Now 😓
          </h1>
          <h4 className="text-base font-medium text-gray-500">
            Are you interested in this product variant? Request a restocking!
            <br /> We will notify you by number when it is back in stock
          </h4>
        </div>
        <div className="gap-2">
          <form onSubmit={handleSubmit}>
            <label htmlFor="" className="font-head text-sm font-medium">
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
    </>
  );
}
