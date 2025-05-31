import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../app/store';
import { fetchProducts, Product } from '../features/product/productSlice';
import { addToCart } from '../features/cart/cartSlice';

const CustomerShop: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h2>Shop</h2>
      <p><Link to="/cart">🧺 View Cart</Link></p>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {products.map((product: Product) => (
          <li key={product.id}>
            {product.name} – ${product.price} – Stock: {product.stock}
            <button onClick={() => dispatch(addToCart(product))}>➕ Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerShop;
