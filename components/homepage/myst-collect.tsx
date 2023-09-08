import { ProductCard } from 'components/product';
import { getCollectionProducts } from 'lib/shopify';

import Link from 'next/link';

export default async function MystCollect() {
  const mystcollect = await getCollectionProducts({ collection: 'mystery-collection' });
  if (!mystcollect?.length) return 'No Products Found';
  return (
    <div className="text-center">
      <Link href={''}>
        <h1 className="mt-6 text-3xl font-semibold uppercase">Mystery Collection</h1>
      </Link>
      <Link href={''}>
        <p className="text-[10px] uppercase text-gray-500 underline">see more</p>
      </Link>
      <div className="my-6 grid grid-cols-2 gap-x-2 px-10 md:grid-cols-3">
        {mystcollect.map((product, index: number) => {
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
