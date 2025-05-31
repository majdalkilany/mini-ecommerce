import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

interface Props {
  children: React.ReactNode;
  role?: 'ADMIN' | 'CUSTOMER';
}

const ProtectedRoute: React.FC<Props> = ({ children, role }) => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  if (!token) return <Navigate to="/login" />;

  if (role && user?.role !== role) {
    return <Navigate to={user?.role === 'ADMIN' ? '/dashboard' : '/shop'} />;
  }

  return children;
};

export default ProtectedRoute;
