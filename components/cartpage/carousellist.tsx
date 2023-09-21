import { Product } from 'lib/shopify/types'; // Import your Product type
import { Carousel } from 'react-responsive-carousel'; // Import the Carousel component

const ProductCarousel = ({ products }: { products: Product[] }) => {
  return (
    <Carousel showIndicators={false}>
      {products.map((product) => (
        <div key={product.handle}>
          <h1>{product.handle}</h1>
        </div>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
