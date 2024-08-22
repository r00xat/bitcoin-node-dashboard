import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import Cookies from 'js-cookie';
import api from './api/api';

type UserStore = {
   isLogged: boolean;
   jwt: string | undefined;
   loading: boolean;
   login(password: string): Promise<void>;
   logout(): unknown;
};

export const useUserStore = create<UserStore>()(
   devtools((set) => ({
      isLogged: false,
      jwt: Cookies.get('token'),
      loading: false,
      login: async (password) => {
         set({ loading: true });
         return api.post('auth/login', { password })
            .then(({data}) => {
               set({
                  isLogged: true,
                  jwt: data.jwt,
                  loading: false
               });

               Cookies.set(
                  'token',
                  data.jwt,
                  {
                     expires: new Date(new Date().getTime() + 21600000), // 6 hours
                     path: '/',
                     secure: false,
                  }
               );
            })
            .catch((error) => {
               set({ loading: false });
               throw new Error(error.response.data.message);
            });
      },
      logout: () => {
         set({ isLogged: false, jwt: undefined });
         Cookies.remove('token');
      }
   }))
);