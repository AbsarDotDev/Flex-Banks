import { CartProductLayout } from 'components/cartpage/cartpage';
import HeaderWithoutHero from 'components/header/header-without-hero';
import Price from 'components/price';
import { ProductCard } from 'components/product';
import { Button } from 'components/ui/button';
import { getCart, getCollectionProducts } from 'lib/shopify';
import { Award, MessageCircle, ShoppingBag, TruckIcon } from 'lucide-react';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

export default async function Cart() {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }
  return (
    <>
      <HeaderWithoutHero />
      <div className="mx-auto mt-[50px] max-w-[1800px] px-20 py-16">
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

        {!cart || cart.lines.length === 0 ? (
          <div className="mt-20 flex w-full flex-col items-center justify-center gap-y-6 overflow-hidden pb-20">
            <ShoppingBag className="h-20 w-20 text-neutral-500 dark:text-neutral-400" />
            <p className="mt-6 text-center text-2xl font-bold">Your cart is sadly empty.</p>
            <Button>
              <Link href="/collection/shoes">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-20 flex gap-x-8">
            <div className="w-3/4">
              <CartProductLayout cart={cart} />
              <PopularProduct />
            </div>
            <div className="w-1/4">
              <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                  <p>Taxes</p>
                  <Price
                    className="text-right text-base text-black dark:text-white"
                    amount={cart!.cost.totalTaxAmount.amount}
                    currencyCode={cart!.cost.totalTaxAmount.currencyCode}
                  />
                </div>
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                  <p>Shipping</p>
                  <p className="text-right">Calculated at checkout</p>
                </div>
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                  <p>Total</p>
                  <Price
                    className="text-right text-base text-black dark:text-white"
                    amount={cart!.cost.totalAmount.amount}
                    currencyCode={cart!.cost.totalAmount.currencyCode}
                  />
                </div>
              </div>
              <Link
                href={cart!.checkoutUrl}
                className="block w-full bg-black p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
              >
                Proceed to Checkout
              </Link>
              <div className="mt-6 bg-gray-100 px-6 py-6">
                <p className="text-center text-xs font-normal">Accepted Payment Methods</p>
                <div className="mt-4 flex flex-row justify-center gap-2">
                  <Image src="/visa-icon.svg" width={50} height={50} alt="Visa" />
                  <Image src="/amex.svg" width={50} height={50} alt="Apple Pay" />
                  <Image src="/mastercard.svg" width={50} height={50} alt="Mastercard" />
                  <Image src="/paypal.svg" width={50} height={50} alt="Paypal" />
                </div>
                <div className="mb-6 flex w-full flex-col border-b-2 border-gray-200 pb-4"></div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <TruckIcon className="h-8 w-8" color="gray" strokeWidth={1} />
                    <p className="ml-2 text-xs font-normal ">Free shipping on orders over 200€.</p>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-8 w-8" color="gray" strokeWidth={1} />
                    <p className="ml-2 text-xs font-normal ">International delivery</p>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-8 w-8" color="gray" strokeWidth={1} />
                    <p className="ml-2 text-xs font-normal ">Authentic products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

async function PopularProduct() {
  const popularprod = await getCollectionProducts({ collection: 'hoodie' });

  if (!popularprod.length) return 'No Related Products To Show';

  return (
    <div className="py-8 ">
      <h2 className="mb-3 text-2xl font-bold">The Popular Products</h2>
      <div className="grid grid-cols-1 gap-x-2 md:grid-cols-3">
        {popularprod.slice(0, 3).map((product) => (
          <ProductCard key={product.handle} product={product} />
        ))}
      </div>
    </div>
  );
}
