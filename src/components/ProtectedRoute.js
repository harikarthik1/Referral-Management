import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { COOKIE_NAME } from '../api';

export default function ProtectedRoute({ children }) {
  const token = Cookies.get(COOKIE_NAME);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
