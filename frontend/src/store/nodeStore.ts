import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from './api/api';
import { IBaseApiStore } from './types';

interface INodeStore extends IBaseApiStore {
   client: string;
   protocolVersion: number;
   port: number;
   services: string[];
   uptime: number;
   loading: boolean;
   fetch(): unknown;
}

export const useNodeStore = create<INodeStore>()(
   devtools((set) => ({
      client: '',
      protocolVersion: 0,
      port: 0,
      services: [],
      uptime: 0,
      loading: false,
      fetch: async () => {
         set({loading: true});
         await api.get('/bitcoin/node')
            .then(({data}) => {
               set({
                     client: data.client,
                     protocolVersion: data.protocolVersion,
                     port: data.port,
                     services: data.services,
                     uptime: data.uptime,
                     loading: false
                  },
                  false,
                  'fetchNodeStore'
               );
            })
            .catch(() => {
               set({loading: false});
            });
      },
   }))
);