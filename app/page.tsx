import { Carousel } from 'components/carousel';
import LowerFooter from 'components/footer/lower-footer';
import UpperFooter from 'components/footer/upper-footer';
import { ThreeItemGrid } from 'components/grid/three-items';
import { ProductCard } from 'components/product';
import VidThumbnail from 'components/thumb-vid';
import Thumbnail from 'components/thumbnail';
import { getCollectionProducts } from 'lib/shopify';
export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const products = await getCollectionProducts({ collection: 'new-arrivals' });

  if (!products?.length) return null;
  return (
    <>
      <ThreeItemGrid />
      <Carousel />
      <VidThumbnail />
      {/* @ts-ignore */}
      <div className="my-20 flex">
        {products.map((product, index: number) => {
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
      <Thumbnail />
      <footer>
        <UpperFooter />
        <LowerFooter />
      </footer>
    </>
  );
}
