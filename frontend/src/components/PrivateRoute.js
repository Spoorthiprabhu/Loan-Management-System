// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    alert('Register/Login to Access This page');
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role || decoded.roles || '';

    if (requiredRole && userRole !== requiredRole) {
      alert('You are not authorized to view this page');
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }

    return children;
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/" replace />;
  }
};

export default PrivateRoute;
