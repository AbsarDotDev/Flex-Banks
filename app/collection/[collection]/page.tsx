import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ColletionGridItems from 'components/collection-grid';
import FilterList from 'components/layout/search/filter';
import { defaultSort, sorting } from 'lib/constants';
import Image from 'next/image';

export const runtime = 'edge';

export async function generateMetadata({
  params
}: {
  params: { collection: string };
}): Promise<Metadata> {
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`
  };
}

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });
  const collection = await getCollection(params.collection);
  return (
    <section className="mt-20 px-10">
      <Image
        src={collection!.image?.url}
        alt={collection!.title}
        width={collection!.image?.width}
        height={collection!.image?.height}
      />
      <h1 className="mt-6 pb-10 text-center text-2xl font-semibold uppercase">
        {params.collection}
      </h1>
      <div className="flex justify-end pb-10">
        <FilterList list={sorting} title="Sort by" />
      </div>

      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <div className="my-6 grid grid-cols-2 gap-x-2 px-10 md:grid-cols-4">
          <ColletionGridItems products={products} />
        </div>
      )}
    </section>
  );
}
