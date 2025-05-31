import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminProductPage from '../pages/AdminProductPage';
import CustomerShop from '../pages/CustomerShop';
import ProtectedRoute from '../components/ProtectedRoute';
import CartPage from '../pages/CartPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route
        path='/dashboard'
        element={
          <ProtectedRoute role='ADMIN'>
            <AdminProductPage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/shop'
        element={
          <ProtectedRoute role='CUSTOMER'>
            <CustomerShop />
          </ProtectedRoute>
        }
      />
      <Route
        path='/cart'
        element={
          <ProtectedRoute role='CUSTOMER'>
            <CartPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
