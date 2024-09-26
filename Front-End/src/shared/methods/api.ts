import axios from 'axios';

const api = axios.create({
  baseURL: 'https://virtual-library-project.onrender.com',
  withCredentials: true,
});

api.interceptors.request.use(config => {

  let token = null

  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;