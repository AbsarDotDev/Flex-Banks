import { CartProductLayout } from 'components/cartpage/cartpage';
import Footer from 'components/footer/footer';
import HeaderWithoutHero from 'components/header/header-without-hero';
import { getCart, getCollectionProducts } from 'lib/shopify';
import { cookies } from 'next/headers';

export default async function Cart() {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }
  const products = await getCollectionProducts({ collection: 'hoodie' });
  // console.log(products);
  return (
    <>
      <HeaderWithoutHero />
      <div className="mx-auto mt-10 max-w-screen-2xl px-4 py-16 md:px-16 lg:px-16">
        <div className="flex gap-x-4 text-center">
          <div className="mb-6 flex w-full flex-col border-b-2 border-black pb-4">
            <h6 className="text-sm font-thin">Cart</h6>
          </div>
          <div className="mb-6 flex w-full flex-col border-b-2 border-gray-200 pb-4">
            <h6 className="text-sm font-thin text-gray-400">Informations</h6>
          </div>
          <div className="mb-6 flex w-full flex-col border-b-2 border-gray-200 pb-4">
            <h6 className="text-sm font-thin text-gray-400">Delivery</h6>
          </div>
          <div className="mb-6 flex w-full flex-col border-b-2 border-gray-200 pb-4">
            <h6 className="text-sm font-thin text-gray-400">Payment</h6>
          </div>
        </div>
        <CartProductLayout cart={cart} products={products} />
      </div>
      <Footer />
    </>
  );
}
