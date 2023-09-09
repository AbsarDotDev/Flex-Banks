import { ProductCard } from 'components/product';
import { getCollectionProducts } from 'lib/shopify';

import Link from 'next/link';

export default async function BestSellers() {
  const bestSellers = await getCollectionProducts({ collection: 'best-sellers' });
  if (!bestSellers?.length) return 'No Products Found';
  return (
    <div className="text-center">
      <Link href={''}>
        <h1 className="mt-6 text-2xl font-semibold uppercase">Best Sellers</h1>
      </Link>
      <Link href={''}>
        <p className="text-[10px] uppercase text-gray-500 underline">see more</p>
      </Link>
      <div className="my-6 grid grid-cols-2 gap-x-2 px-10 md:grid-cols-3">
        {bestSellers.map((product, index: number) => {
          console.log('Max:' + product.compareAtPriceRange.maxVariantPrice.amount);
          console.log('min:' + product.compareAtPriceRange.minVariantPrice.amount);

          return <ProductCard key={index} product={product} />;
        })}
      </div>
    </div>
  );
}
