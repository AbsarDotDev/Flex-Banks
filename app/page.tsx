import { Carousel } from 'components/carousel';
import LowerFooter from 'components/footer/lower-footer';
import UpperFooter from 'components/footer/upper-footer';
import { ThreeItemGrid } from 'components/grid/three-items';
import { Product } from 'components/product';
export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <>
      <ThreeItemGrid />
      <Carousel />
      {/* @ts-ignore */}
      <Product />
      <footer>
        <UpperFooter />
        <LowerFooter />
      </footer>
    </>
  );
}
