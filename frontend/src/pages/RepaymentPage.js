import React, { useEffect, useState } from 'react';
import axios from '../services/axios';

const RepaymentPage = () => {
  const [loanId, setLoanId] = useState('');
  const [repayments, setRepayments] = useState([]);
  const [message, setMessage] = useState('');

  const fetchRepayments = async () => {
    try {
      const response = await axios.get(`/api/loans/repayment/${loanId}`);
      setRepayments(response.data);
      setMessage('');
    } catch (error) {
      setMessage('Failed to fetch repayment schedule.');
    }
  };

  const markAsPaid = async (scheduleId) => {
    try {
      const response = await axios.put(`/api/loans/repayment/mark-paid/${scheduleId}`);
      setMessage(response.data);
      fetchRepayments();
    } catch (error) {
      setMessage('Failed to mark repayment as paid.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Repayment Schedule</h2>

      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter Loan ID"
          value={loanId}
          onChange={(e) => setLoanId(e.target.value)}
          style={styles.input}
        />
        <button onClick={fetchRepayments} style={styles.button}>Fetch</button>
      </div>

      {message && <p style={styles.message}>{message}</p>}

      {repayments.length > 0 && (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {repayments.map((repayment) => (
                <tr key={repayment.id}>
                  <td>{repayment.dueDate}</td>
                  <td>₹{repayment.amount.toFixed(2)}</td>
                  <td style={{ color: repayment.paid ? '#2ecc71' : '#e74c3c' }}>
                    {repayment.paid ? 'Paid' : 'Unpaid'}
                  </td>
                  <td>
                    {!repayment.paid && (
                      <button style={styles.actionButton} onClick={() => markAsPaid(repayment.id)}>
                        Mark as Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '26px',
    color: '#2c3e50',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    gap: '10px',
  },
  input: {
    padding: '10px',
    width: '250px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#2980b9',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    color: '#27ae60',
    marginTop: '10px',
    fontWeight: 'bold',
  },
  tableContainer: {
    overflowX: 'auto',
    marginTop: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
  },
  actionButton: {
    padding: '6px 12px',
    fontSize: '13px',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default RepaymentPage;
