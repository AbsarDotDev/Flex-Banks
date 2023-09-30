'use client';
import { createUrl } from 'lib/utils';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    (async function fetchData() {
      setSearchValue(searchParams?.get('q') || '');
    })();
  }, [searchParams]);

  // async function onChangeSearch(e: ChangeEvent<HTMLInputElement>) {
  //   setSearchValue(e.target.value);
  //   console.log(e.target.value);

  //   const search = e.target as HTMLInputElement;
  //   const newQuickParams = new URLSearchParams(quickParams.toString());

  //   if (search.value) {
  //     newQuickParams.set('q', search.value);
  //   } else {
  //     newQuickParams.delete('q');
  //   }

  //   setQuickParams(newQuickParams); // Update quickParams with the newQuickParams
  // }

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
  return (
    <form onSubmit={onSubmit} className="relative flex h-full w-full max-w-6xl items-center">
      <div className="searchbar flex w-full items-center rounded-lg bg-gray-200 px-4">
        <input
          type="text"
          name="search"
          placeholder="Search for products..."
          autoComplete="off"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full border-transparent bg-transparent px-4 py-4 text-black focus:border-transparent focus:outline-none focus:ring-transparent"
        />
        <Search className="h-8 text-gray-500" />
        {/* @ts-ignore */}
        {/* {searchValue !== '' ? (
          <Suspense>
            <SearchQuick searchParams={"q":} />
          </Suspense>
        ) : (
          <div></div>
        )} */}
      </div>
    </form>
  );
}
