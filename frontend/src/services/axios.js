// src/services/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8081',
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
