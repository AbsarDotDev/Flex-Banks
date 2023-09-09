import LowerFooter from 'components/footer/lower-footer';
import UpperFooter from 'components/footer/upper-footer';
import BestSellers from 'components/homepage/best-sellers';
import MystCollect from 'components/homepage/myst-collect';
import NewArrivals from 'components/homepage/new-arrivs';
import VidThumbnail from 'components/homepage/thumb-vid';
import Thumbnail from 'components/homepage/thumbnail';
import url2 from 'public/lastthumbnail.jpg';
import url1 from 'public/thumbnail.jpg';
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
      {/* @ts-ignore */}
      <NewArrivals />

      <Thumbnail imageUrl={url1} />
      {/* @ts-ignore */}
      <BestSellers />

      <VidThumbnail />
      {/* @ts-ignore */}
      <MystCollect />
      <Thumbnail imageUrl={url2} />
      <footer>
        <UpperFooter />
        <LowerFooter />
      </footer>
    </>
  );
}
