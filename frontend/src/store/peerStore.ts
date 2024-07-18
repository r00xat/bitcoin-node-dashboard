import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from './api/api';

export type Peer = {
   id: number;
   address: string;
   services: string[];
   bytessent: number;
   bytesrecv: number;
   conectionTime: number;
   version: number;
   subversion: string;
   connection_type: string;
   inbound: boolean;
}

type PeerStore = {
   peers: Peer[];
   loading: boolean;
   fetch(): unknown;
}

export const usePeerStore = create<PeerStore>()(
   devtools((set) => ({
      peers: [],
      loading: false,
      fetch: async () => {
         set({ loading: true });
         await api.get('/bitcoin/peers')
            .then(({ data }) => {
               set({
                  peers: data,
                  loading: false
               },
                  false,
                  'fetchPeerStore'
               );
            })
            .catch(() => {
               set({ loading: false });
            });
      },
   }))
);