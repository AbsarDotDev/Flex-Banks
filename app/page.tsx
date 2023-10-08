import Header from 'components/header/header';
import { ProductCard } from 'components/product';
import { Button } from 'components/ui/button';
import { getCollectionProducts } from 'lib/shopify';
import { MapPin } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};
export default async function HomePage() {
  const newArrivs = await getCollectionProducts({ collection: 'shoes' });
  const bestSellers = await getCollectionProducts({ collection: 'slippers' });
  const mystcollect = await getCollectionProducts({ collection: 'hoodie' });

  if (!newArrivs?.length) return 'No Products Found';
  if (!bestSellers?.length) return 'No Products Found';
  if (!mystcollect?.length) return 'No Products Found';
  return (
    <>
      <Header />

      <div className="NEW_ARRIVALS text-center">
        <Link href={'/collection/new-arrivals'}>
          <h1 className="mt-6 text-2xl font-semibold uppercase">New Arrival</h1>
        </Link>
        <Link href={'/collection/new-arrivals'}>
          <p className="text-[10px] uppercase text-gray-500 underline">see more</p>
        </Link>
        <div className="my-6 grid grid-cols-1 gap-x-4 px-10 md:grid-cols-3">
          {newArrivs.slice(0, 6).map((product) => {
            return <ProductCard key={product.handle} product={product} />;
          })}
        </div>
      </div>

      <div className="thumbnail w-full">
        <Image
          src={'/thumbnail.jpg'}
          width={10000}
          height={300}
          alt="thumbnail"
          className="h-[300px] md:h-0"
        />
      </div>

      <div className="BEST_SELLERS text-center">
        <Link href={''}>
          <h1 className="mt-6 text-2xl font-semibold uppercase">Best Sellers</h1>
        </Link>
        <Link href={''}>
          <p className="text-[10px] uppercase text-gray-500 underline">see more</p>
        </Link>
        <div className="my-6 grid grid-cols-1 gap-x-4 px-10 md:grid-cols-3">
          {bestSellers.slice(0, 6).map((product, index: number) => {
            return <ProductCard key={index} product={product} />;
          })}
        </div>
      </div>

      <div className="thumbnail-vid py-16">
        <video autoPlay muted className="h-[400px] w-full object-cover md:h-[550px]">
          <source src="/vidthumb.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="MYST_COLLECTION text-center">
        <Link href={''}>
          <h1 className="mt-6 text-3xl font-semibold uppercase">Mystery Collection</h1>
        </Link>
        <Link href={''}>
          <p className="text-[10px] uppercase text-gray-500 underline">see more</p>
        </Link>
        <div className="my-6 grid grid-cols-1 gap-x-4 px-10 md:grid-cols-3">
          {mystcollect.slice(0, 6).map((product, index: number) => {
            return <ProductCard key={index} product={product} />;
          })}
        </div>
      </div>

      <div className="thumbnail">
        <Image src={'/lastthumbnail.jpg'} width={10000} height={300} alt="thumbnail" className="" />
      </div>

      <div className="FOOTER flex-col md:flex md:flex-row">
        <div className="px-6 py-8 md:w-1/2 md:px-14 md:pt-20">
          <h2 className="text-3xl font-medium">VISIT THE STORE</h2>
          <h6 className="pt-1 text-sm font-semibold">ENTREPRISE CERTIFIÉE cetified badge</h6>
          <div className="py-2">
            <p>Entrepôt </p> <p>66 Av des champs-Élysées</p> <p>75008 Paris</p>
          </div>
          <Link
            href={
              'https://www.google.com/maps/place/66+Av.+des+Champs-%C3%89lys%C3%A9es,+75008+Paris,+France/@48.8709478,2.3028764,17z/data=!3m1!4b1!4m6!3m5!1s0x47e66fc3c52c6deb:0x9eda90a43280f6b0!8m2!3d48.8709478!4d2.3054513!16s%2Fg%2F11c5ptvxs9?entry=ttu'
            }
          >
            <Button className="rounded-none border-[1px] border-black bg-white px-8 py-3 text-sm uppercase text-black">
              <MapPin className="w-5" />
              &nbsp; Directions
            </Button>
          </Link>
        </div>
        <div className="md:w-1/2">
          {' '}
          <Image
            src={'/footerimg.png'}
            width={100}
            height={100}
            alt="foooter image"
            className="h-[350px] w-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
