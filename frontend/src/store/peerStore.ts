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
}

type PeerStore = {
   peers: Peer[];
   fetch(): unknown;
}

export const usePeerStore = create<PeerStore>()(
   devtools((set) => ({
      peers: [],
      fetch: async () => {
         await api.get('/bitcoin/peers')
            .then(({ data }) => {
               set({
                  peers: data
               },
                  false,
                  'fetchPeerStore'
               );
            });
      },
   }))
);