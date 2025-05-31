import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  Product,
} from '../features/product/productSlice';
import axios from 'axios';

interface OrderItem {
  productId: string;
  quantity: number;
  priceAtOrder: number;
}

interface Order {
  id: string;
  createdAt: string;
  userId: string;
  totalAmount: number;
  items: OrderItem[];
}

const AdminProductPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.products);
  const { token } = useSelector((state: RootState) => state.auth);
  const baseURL = import.meta.env.VITE_API_URL;

  const [tab, setTab] = useState<'products' | 'orders'>('products');
  const [form, setForm] = useState<Partial<Product>>({ name: '', price: 0, stock: 0 });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (tab === 'products') {
      dispatch(fetchProducts());
    } else {
      fetchOrders();
    }
  }, [dispatch, tab]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${baseURL}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to load orders:', err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateProduct({ id: editingId, data: form }));
    } else {
      dispatch(createProduct(form as { name: string; price: number; stock: number }));
    }
    setForm({ name: '', price: 0, stock: 0 });
    setEditingId(null);
  };

  const handleEdit = (product: Product) => {
    setForm({ name: product.name, price: product.price, stock: product.stock });
    setEditingId(product.id);
  };

  const getProductNameById = (productId: string): string => {
    const product = products.find((p) => p.id === productId);
    return product ? product.name : 'Unknown Product';
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setTab('products')}>🧾 Products</button>
        <button onClick={() => setTab('orders')}>📦 Orders</button>
      </div>

      {tab === 'products' && (
        <>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
              required
            />
            <input
              placeholder="Stock"
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) })}
              required
            />
            <button type="submit">{editingId ? 'Update' : 'Create'} Product</button>
          </form>

          <ul>
            {products.map((p) => (
              <li key={p.id}>
                {p.name} – ${p.price} – Stock: {p.stock}
                <button onClick={() => handleEdit(p)}>✏️</button>
                <button onClick={() => dispatch(deleteProduct(p.id))}>❌</button>
              </li>
            ))}
          </ul>
        </>
      )}

      {tab === 'orders' && (
        <div>
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}>
                <p><strong>ID:</strong> {order.id}</p>
                <p><strong>User ID:</strong> {order.userId}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                <ul>
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {getProductNameById(item.productId)} – Qty: {item.quantity} – 💰 ${item.priceAtOrder.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProductPage;
