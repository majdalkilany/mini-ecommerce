import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { removeFromCart, clearCart } from '../features/cart/cartSlice';
import axios from 'axios';

const CartPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);
  const { token } = useSelector((state: RootState) => state.auth);
  const baseURL = import.meta.env.VITE_API_URL;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    const orderPayload = {
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    console.log('Order payload:', orderPayload);

    try {
      await axios.post(`${baseURL}/orders`, orderPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      alert('Order placed successfully!');
      dispatch(clearCart());
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Order failed:', err.response?.data);
        alert(`Order failed: ${err.response?.data?.message || 'Unknown error'}`);
      } else {
        console.error('Unexpected error:', err);
        alert('An unexpected error occurred.');
      }
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.name} – ${item.price} × {item.quantity}
                <button onClick={() => dispatch(removeFromCart(item.id))}>❌ Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={placeOrder}>🧾 Place Order</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
