'use client';
import { getProduct } from 'lib/shopify';
import { createUrl } from 'lib/utils';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, Suspense, useEffect, useState } from 'react';
import SearchQuick from './searchquick';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const [quickParams, setQuickParams] = useState(new URLSearchParams());

  useEffect(() => {
    setSearchValue(searchParams?.get('q') || '');
  }, [searchParams, setSearchValue]);

  async function onChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
    console.log(e.target.value);
    const product = await getProduct('air force 1 cactus');
    console.log(product);
    const search = e.target as HTMLInputElement;
    const newQuickParams = new URLSearchParams(quickParams.toString());

    if (search.value) {
      newQuickParams.set('q', search.value);
    } else {
      newQuickParams.delete('q');
    }

    setQuickParams(newQuickParams); // Update quickParams with the newQuickParams
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set('q', search.value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/search', newParams));
  }
  console.log(quickParams.get('q'));
  return (
    <form onSubmit={onSubmit} className="relative flex h-full w-full max-w-6xl items-center">
      <div className="searchbar flex w-full items-center rounded-lg bg-gray-200 px-4">
        <input
          type="text"
          name="search"
          placeholder="Search for products..."
          autoComplete="off"
          value={searchValue}
          onChange={(e) => onChangeSearch(e)}
          className="w-full border-transparent bg-transparent px-4 py-4 text-black focus:border-transparent focus:outline-none focus:ring-transparent"
        />
        <Search className="h-8 text-gray-500" />
        {/* @ts-ignore */}
        {searchValue !== '' ? (
          <Suspense>
            <SearchQuick searchParams={quickParams} />
          </Suspense>
        ) : (
          <div></div>
        )}
      </div>
    </form>
  );
}
