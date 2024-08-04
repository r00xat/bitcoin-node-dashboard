import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from './api/api';

type UserStore = {
   isLogged: boolean;
   jwt: string | undefined;
   loading: boolean;
   login(username: string, password: string): unknown;
   logout(): unknown;
};

export const useUserStore = create<UserStore>()(
   devtools((set) => ({
      isLogged: false,
      jwt: undefined,
      loading: false,
      login: async (password) => {
         set({ loading: true });
         await api.post('/login', { password })
            .then(({data}) => {
               set({
                  isLogged: true,
                  jwt: data.jwt,
                  loading: false
               },
                  false,
                  'loginUserStore'
               );
            })
            .catch(() => {
               set({ loading: false });
            });
      },
      logout: () => {
         set({ isLogged: false, jwt: undefined });
      }
   }))
);