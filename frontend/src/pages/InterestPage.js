import React, { useState } from 'react';
import axios from '../services/axios';

const InterestPage = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [tenure, setTenure] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [calculatedInterest, setCalculatedInterest] = useState(null);
  const [totalPayable, setTotalPayable] = useState(null);

  const calculateInterest = async () => {
    try {
      const response = await axios.post('/api/loans/calculate-interest', {
        loanAmount,
        tenure,
        interestRate,
      });

      setCalculatedInterest(response.data.interestAmount);
      setTotalPayable(response.data.totalPayable);
    } catch (error) {
      console.error("Error calculating interest", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Interest Calculator</h2>

      <div style={styles.inputGroup}>
        <input
          style={styles.input}
          placeholder="Loan Amount"
          value={loanAmount}
          onChange={e => setLoanAmount(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Tenure (months)"
          value={tenure}
          onChange={e => setTenure(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Interest Rate (%)"
          value={interestRate}
          onChange={e => setInterestRate(e.target.value)}
        />
        <button style={styles.button} onClick={calculateInterest}>
          Calculate
        </button>
      </div>

      {calculatedInterest && (
        <p style={styles.result}>Interest Amount: ₹{calculatedInterest}</p>
      )}
      {totalPayable && (
        <p style={styles.result}>Total Payable: ₹{totalPayable}</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '30px',
    fontSize: '26px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '10px 16px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  result: {
    marginTop: '10px',
    fontSize: '18px',
    fontWeight: '500',
    color: '#2c3e50',
  },
};

export default InterestPage;
