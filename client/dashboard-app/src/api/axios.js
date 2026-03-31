import axios from 'axios';

const api = axios.create({
  baseURL: 'http://dashboard.myplatform.local:3002/api', // --> Dashboard Backend
  withCredentials: true
});

export default api;