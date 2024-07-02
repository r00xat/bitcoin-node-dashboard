import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from './api/api';

type NodeStore = {
   client: string;
   protocolVersion: number;
   port: number;
   services: string[];
   uptime: number;
   fetch(): unknown;
}

export const useNodeStore = create<NodeStore>()(
   devtools((set) => ({
      client: '',
      protocolVersion: 0,
      port: 0,
      services: [],
      uptime: 0,
      fetch: async () => {
         await api.get('/bitcoin/node')
            .then(({data}) => {
               set({
                     client: data.client,
                     protocolVersion: data.protocolVersion,
                     port: data.port,
                     services: data.services,
                     uptime: data.uptime,
                  },
                  false,
                  'fetchNodeStore'
               );
            });
      },
   }))
);