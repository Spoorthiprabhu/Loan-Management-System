import React, { useEffect, useState } from 'react';
import axios from '../services/axios';

const RepaymentSchedule = () => {
  const [repayments, setRepayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('/api/loans/repayment/1', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRepayments(res.data);
      } catch (error) {
        console.error("Failed to fetch repayment data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Repayment Schedule</h2>
      {repayments.length === 0 ? (
        <p style={styles.message}>No repayment schedule found.</p>
      ) : (
        <div style={styles.listContainer}>
          {repayments.map((r) => (
            <div key={r.id} style={styles.card}>
              <div style={styles.row}>
                <span style={styles.label}>Due Date:</span>
                <span>{r.dueDate}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Amount:</span>
                <span>₹{r.amount.toFixed(2)}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Paid:</span>
                <span style={{ color: r.paid ? '#2ecc71' : '#e74c3c' }}>
                  {r.paid ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '700px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#fefefe',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    textAlign: 'center',
    fontSize: '26px',
    color: '#2c3e50',
    marginBottom: '30px',
  },
  message: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: '16px',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: '16px 20px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '6px 0',
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
};

export default RepaymentSchedule;
