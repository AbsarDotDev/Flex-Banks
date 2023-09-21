import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AddToCartBtn } from 'components/cart/add-to-cart-btn';
import { BuyVariantSelector } from 'components/product/buy-variant-selector';
import { Button } from 'components/ui/button';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct } from 'lib/shopify';
import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/1080p.gif';

export const runtime = 'edge';

export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <header className="fixed flex w-full justify-center border-b-[1px] border-gray-700 bg-white py-4 pr-4">
        <Image src={logo} alt="thumbnail" width={80} />
      </header>
      <div className="flex flex-col dark:border-neutral-800 dark:bg-black lg:flex-row">
        <div className="h-full w-full basis-full px-10 pt-32 lg:basis-[55%]">
          <h1 className="pb-8 text-center text-3xl font-semibold">{product.title}</h1>
          <Image src={product.featuredImage.url} alt="" width={1000} height={1000} />
        </div>

        <div className="h-screen w-full basis-full bg-gray-200 lg:basis-[45%]">
          <BuyVariantSelector
            options={product.options}
            variants={product.variants}
            product={product}
          />
        </div>
      </div>

      <div className="fixed bottom-0 flex w-full justify-around border-t-[1px] border-gray-700 bg-white py-4">
        <Button className="rounded-none border-[1px] border-black bg-transparent px-7 py-6 text-gray-600">
          <Link className="text-gray-600" href={`/product/${product.handle}`}>
            Cancel
          </Link>
        </Button>
        <AddToCartBtn
          variants={product.variants}
          availableForSale={product.availableForSale}
          product={product}
        />
      </div>
    </>
  );
}
