import HeaderWithoutHero from 'components/header/header-without-hero';
import FilterList from 'components/layout/search/filter';
import { ProductCard } from 'components/product';
import { defaultSort, sorting } from 'lib/constants';
import { getProducts } from 'lib/shopify';

export const runtime = 'edge';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
};

export default async function SearchPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? 'results' : 'result';

  return (
    <>
      <HeaderWithoutHero />
      <div className="mt-[200px] px-12">
        <div className="order-none float-right md:order-last md:w-[200px]">
          <FilterList list={sorting} title="Sort by" />
        </div>
        {searchValue ? (
          <p className="text-xl">
            {products.length === 0
              ? 'There are no products that match '
              : `Showing ${products.length} ${resultsText} for `}
            <span className="font-bold">&quot;{searchValue}&quot;</span>
          </p>
        ) : null}
        {products.length > 0 ? (
          <div className="my-6 grid grid-cols-1 gap-x-6  md:grid-cols-4">
            {products.map((product) => {
              return <ProductCard key={product.handle} product={product} />;
            })}
          </div>
        ) : null}
      </div>
    </>
  );
}
