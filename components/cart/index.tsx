'use client';
import { useStore } from 'app/store';
// eslint-disable-next-line no-unused-vars
import CartModal from './modal';

export default function Cart() {
  const cart = useStore((state) => state.cart);
  console.log(cart);
  // const [cart, setCart] = useState<Cart | undefined>(); // Initialize with null

  // useEffect(() => {
  //     getCartId().then((newCart) => {
  //         setCart(newCart);
  //     });

  // },[cart]); // Remove 'cart' from dependencies
  // const cart= useStore.getState().cart
  // Render the CartModal component with the cart data
  return <CartModal cart={cart} />;
}
