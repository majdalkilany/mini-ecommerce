import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<Props> = ({ children, allowedRoles }) => {
  const { token, user } = useSelector((state: RootState) => state.auth);

  if (!token || !user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
