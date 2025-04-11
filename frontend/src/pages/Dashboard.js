import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome to the Loan Management System</h2>
      <div className="dashboard-grid">
        <Link to="/apply-loan" className="dashboard-card">
          📝
          <h3>Apply Loan</h3>
        </Link>
        
        <Link to="/repayment" className="dashboard-card">
          💳
          <h3>Repayment</h3>
        </Link>
        <Link to="/repayment-schedule" className="dashboard-card">
          📅
          <h3>Repayment Schedule</h3>
        </Link>
        <Link to="/interest" className="dashboard-card">
          💵
          <h3>Interest Calculation</h3>
        </Link>
        <Link to="/approval" className="dashboard-card">
          ✅
          <h3>Approve Loans</h3>
        </Link>
        
        <Link to="/payment" className="dashboard-card">
          💰
          <h3>Pay</h3>
        </Link>
		

      </div>
    </div>
  );
};

export default Dashboard;
