import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
   baseURL: import.meta.env.VITE_BACKEND_URL,
   headers: {
      'Content-Type': 'application/json'
   },
});

api.interceptors.request.use(function (config) {
   const token = Cookies.get('token');
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});


export default api;