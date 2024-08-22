import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from "@/store/userStore";

const api = axios.create({
   baseURL: import.meta.env.VITE_BACKEND_URL,
   headers: {
      'Content-Type': 'application/json'
   },
});

function AxiosInterceptor({children}: {children: React.ReactNode}) {
   const userStore = useUserStore();
   const navigate = useNavigate();

   useEffect(() => {
      api.interceptors.request.use(function (config) {
         const token = Cookies.get('token');
         if (token) {
            config.headers.Authorization = `Bearer ${token}`;
         }
         return config;
      });
      
      api.interceptors.response.use(function (response) {
         return response;
      }, function (error) {
         if (error.response.status === 401 && !window.location.pathname.includes('/login')) {
            userStore.logout();
            navigate('/login');
         }
         return Promise.reject(error);
      });
   }, []);

   return children;
}

export default api;
export { AxiosInterceptor };