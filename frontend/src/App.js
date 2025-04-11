// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import 'font-awesome/css/font-awesome.min.css';
import { jwtDecode } from "jwt-decode";


import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ApplyLoan from './pages/ApplyLoan';
import RepaymentSchedule from './pages/RepaymentSchedule';
import RepaymentPage from './pages/RepaymentPage';
import InterestPage from './pages/InterestPage';
import ApprovalPage from './pages/ApprovalPage';
import PaymentPage from './pages/PaymentPage';
import Unauthorized from './pages/Unauthorized';

function App() {
  // Get role from JWT token
  const token = localStorage.getItem("token");
  let role = null;
  if (token) {
    try {
		const decoded = jwtDecode(token);

      role = decoded.role; // Make sure your token has a 'role' field
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/apply-loan" element={<PrivateRoute><ApplyLoan /></PrivateRoute>} />
          <Route path="/repayment-schedule" element={<PrivateRoute><RepaymentSchedule /></PrivateRoute>} />
          <Route path="/repayment" element={<PrivateRoute><RepaymentPage /></PrivateRoute>} />
          <Route path="/interest" element={<PrivateRoute><InterestPage /></PrivateRoute>} />
		  <Route
		    path="/approval"
		    element={
		      <PrivateRoute requiredRole="ROLE_ADMIN">
		        <ApprovalPage />
		      </PrivateRoute>
		    }
		  />
          <Route path="/payment" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
