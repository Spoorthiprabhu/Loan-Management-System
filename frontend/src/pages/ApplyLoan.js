import React, { useState } from 'react';
import axios from '../services/axios';
import { useNavigate } from 'react-router-dom';

const ApplyLoan = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    pan: '',
    annualIncome: '',
    amount: '',
    tenure: '',
    purpose: '',
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (!token) return alert('You must be logged in to apply for a loan.');

    try {
      const res = await axios.post(
        "/api/loans/apply",
        { ...formData, username },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const userId = res.data.userId || 1;

      if (file) {
        const formDataObj = new FormData();
        formDataObj.append('file', file);
        await axios.post(`/api/loans/upload-document/${userId}`, formDataObj, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      alert('Loan applied & document uploaded!');
      setFormData({
        fullName: '',
        address: '',
        pan: '',
        annualIncome: '',
        amount: '',
        tenure: '',
        purpose: '',
      });
      setFile(null);
      console.log("Loan submitted successfully. Redirecting...");
      navigate('/dashboard');
    } catch (error) {
      console.error("Error applying loan:", error);
      alert("Loan Application Failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Apply for a Loan</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {['fullName', 'address', 'pan', 'annualIncome', 'amount', 'tenure', 'purpose'].map((field) => (
          <div key={field} style={styles.inputGroup}>
            <label style={styles.label}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={['annualIncome', 'amount', 'tenure'].includes(field) ? 'number' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
        ))}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Upload Document</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={styles.fileInput}
          />
        </div>
        <button type="submit" style={styles.button}>Submit Application</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    background: '#ffffff',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '30px',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '600',
    color: '#34495e',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border 0.3s',
  },
  fileInput: {
    marginTop: '6px',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#2980b9',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
};

export default ApplyLoan;
