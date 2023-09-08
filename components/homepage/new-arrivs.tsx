import { ProductCard } from 'components/product';
import { getCollectionProducts } from 'lib/shopify';

import Link from 'next/link';

export default async function NewArrivals() {
  const newArrivs = await getCollectionProducts({ collection: 'new-arrivals' });
  if (!newArrivs?.length) return 'No Products Found';
  return (
    <div className="text-center">
      <Link href={'#'}>
        <h1 className="mt-6 text-2xl font-semibold uppercase">New Arrival</h1>
      </Link>
      <Link href={'#'}>
        <p className="text-[10px] uppercase text-gray-500 underline">see more</p>
      </Link>
      <div className="my-6 grid grid-cols-2 gap-x-2 px-10 md:grid-cols-3">
        {newArrivs.map((product, index: number) => {
          return (
            <ProductCard
              key={index}
              title={product.title}
              amount={product.priceRange.maxVariantPrice.amount}
              fimage={product.featuredImage.url}
              images={product.images}
            />
          );
        })}
      </div>
    </div>
  );
}
