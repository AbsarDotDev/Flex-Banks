import { Carousel } from 'components/carousel';
import LowerFooter from 'components/footer/lower-footer';
import UpperFooter from 'components/footer/upper-footer';
import { ThreeItemGrid } from 'components/grid/three-items';
export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      <ThreeItemGrid />
      <Carousel />
      <footer>
        <UpperFooter />
        <LowerFooter />
      </footer>
    </>
  );
}
