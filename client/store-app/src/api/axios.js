import axios from 'axios';

const api = axios.create({
  baseURL: 'http://store.myplatform.local:3003/api',
  withCredentials: true 
});

export default api;