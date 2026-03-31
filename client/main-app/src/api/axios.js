import axios from 'axios';

const api = axios.create({
  baseURL: 'http://app.myplatform.local:3001/api', // 3001 --> Auth Service
  withCredentials: true 
});

export default api;