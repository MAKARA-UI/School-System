import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend URL
});

// API calls for Profile
export const getProfile = () => api.get('/profile');
export const updateProfile = (profile) => api.put('/profile', profile);

// API calls for Records
export const getRecords = () => api.get('/records');

// API calls for Report
export const getReport = () => api.get('/report');
