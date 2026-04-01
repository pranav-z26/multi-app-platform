import axios from 'axios';

const api = axios.create({
  baseURL: 'http://app.myplatform.local:3001/api',
  withCredentials: true 
});

export default api;