import React, { useState, useEffect } from 'react';
import axios from '../services/axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const ApprovalPage = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const decoded = jwtDecode(token);
    if (!decoded.role || decoded.role !== 'ROLE_ADMIN') {
      navigate('/unauthorized');
      return;
    }

    const fetchPendingApplications = async () => {
      try {
        const response = await axios.get('/api/loans/pending', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching pending applications', error);
      }
    };

    fetchPendingApplications();
  }, [navigate]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/loans/status/${id}?status=${status}`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setApplications(applications.filter(app => app.id !== id));
    } catch (error) {
      console.error(`Failed to ${status} loan`, error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Loan Approval Page</h2>
      {applications.length === 0 ? (
        <p style={styles.noData}>No applications pending approval.</p>
      ) : (
        applications.map(app => (
          <div key={app.id} style={styles.card}>
            <p style={styles.name}><strong>{app.fullName}</strong></p>
            <p>Loan Amount: ₹{app.amount}</p>
            <p>Status: {app.status}</p>
            <p>Applied On: {new Date(app.createdAt).toLocaleString()}</p>
            <div style={styles.buttonGroup}>
              <button style={styles.approveBtn} onClick={() => updateStatus(app.id, 'APPROVED')}>
                Approve
              </button>
              <button style={styles.rejectBtn} onClick={() => updateStatus(app.id, 'REJECTED')}>
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '30px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '30px',
    fontSize: '26px',
  },
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
  },
  name: {
    fontSize: '18px',
    color: '#333',
  },
  buttonGroup: {
    marginTop: '15px',
    display: 'flex',
    gap: '12px',
  },
  approveBtn: {
    padding: '10px 16px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
  },
  rejectBtn: {
    padding: '10px 16px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#E74C3C',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
  },
  noData: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    marginTop: '20px',
  },
};

export default ApprovalPage;
