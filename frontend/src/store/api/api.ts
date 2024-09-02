import axios from 'axios';
import { useUserStore } from "@/store/userStore";

const api = axios.create({
   baseURL: import.meta.env.VITE_BACKEND_URL,
   headers: {
      'Content-Type': 'application/json'
   },
});

api.interceptors.request.use(function (config) {
   if (useUserStore.getState().jwt) {
      config.headers.Authorization = `Bearer ${useUserStore.getState().jwt}`;
   }
   return config;
});

api.interceptors.response.use(function (response) {
   return response;
}, function (error) {
   if (error.response?.status === 401 && useUserStore.getState().isLogged) {
      useUserStore.getState().logout();
   } else {
      return Promise.reject(error);
   }
});

export default api;