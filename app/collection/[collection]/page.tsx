import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ColletionGridItems from 'components/collection-grid';
import HeaderWithoutHero from 'components/header/header-without-hero';
import FilterList from 'components/layout/search/filter';
import NewsLetter from 'components/news_letter';
import { Button } from 'components/ui/button';
import { defaultSort, sorting } from 'lib/constants';
import Image from 'next/image';
import image2 from '../../../public/trop.jpg';
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
  // console.log(collection);
  return (
    <>
      <HeaderWithoutHero />
      <section className="">
        <Image
          className="h-[400px] min-w-full object-cover"
          src={collection!.image?.url}
          alt={collection!.title}
          width={collection!.image?.width}
          height={collection!.image?.height}
        />
        <div className="text-blac absolute right-0  top-0 flex h-full w-full flex-col items-end justify-center pr-10">
          <h1 className="text-4xl font-semibold uppercase"> {params.collection}</h1>
          <Button className="my-5 rounded border px-4 py-2 transition duration-300 ease-in-out hover:border-transparent hover:text-white">
            Shop Now
          </Button>
        </div>
        <h1 className="mt-6 pb-10 text-center text-2xl font-semibold uppercase">
          {params.collection}
        </h1>

        <p className=" text-center text-2xl font-semibold uppercase text-black">
          {collection!.description}
        </p>

        <div className="flex justify-end pb-10 pr-10">
          <FilterList list={sorting} title="Sort by" />
        </div>

        {products.length === 0 ? (
          <p className="py-3 text-lg">{`No products found in this collection`}</p>
        ) : (
          <div className="my-6 grid grid-cols-1 gap-x-2 px-10 md:grid-cols-3">
            <ColletionGridItems products={products} />
          </div>
        )}
        <Image className="w-full" src={image2} alt=""></Image>
        <NewsLetter />
        <footer />
      </section>
    </>
  );
}
