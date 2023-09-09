import { Product } from 'lib/shopify/types';
import { ProductCard } from './product';

export default function ColletionGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.handle} product={product} />
      ))}
    </>
  );
}
