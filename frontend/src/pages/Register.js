import React, { useState } from 'react';
import axios from '../services/axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', user);
      alert('Registration successful');
	  navigate('/')
      //navigate('/dashboard');
    } catch (err) {
      alert('Error during registration');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
		<form onSubmit={handleSubmit} style={styles.form}>
		  <input
		    name="username"
		    placeholder="Username"
		    onChange={handleChange}
		    required
		    style={styles.input}
		  />
		  <input
		    name="email"
		    type="email"
		    placeholder="Email"
		    onChange={handleChange}
		    required
		    style={styles.input}
		  />
		  <input
		    name="password"
		    type="password"
		    placeholder="Password"
		    onChange={handleChange}
		    required
		    style={styles.input}
		  />
		  <select name="role" value={user.role} onChange={handleChange} style={styles.input} required>
		    <option value="USER">User</option>
		    <option value="ADMIN">Admin</option>
		  </select>
		  <button type="submit" style={styles.button}>Register</button>
		</form>

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    background: '#ffffff',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: '#111827',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    outline: 'none',
  },
  button: {
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: 'none',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  }
};

export default Register;
