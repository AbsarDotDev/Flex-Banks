import { useStore } from 'app/store';
import { getCartId } from './cart-with-server';

export function setCart() {
  getCartId().then((newCart) => {
    useStore.setState({ cart: newCart });
  });
}
