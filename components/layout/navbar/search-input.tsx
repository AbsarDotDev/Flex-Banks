'use client';
import { createUrl } from 'lib/utils';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';

export default function InputSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  // const [quickParams, setQuickParams] = useState(new URLSearchParams());
  useEffect(() => {
    setSearchValue(searchParams?.get('q') || '');
  }, [searchParams, setSearchValue]);

  async function onChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
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
      </div>
    </form>
  );
}
