import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from './api/api';

export type Peer = {
   id: number;
   address: string;
   services: string[];
   bytessent: number;
   bytesrecv: number;
   totalbytes: number;
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
   sortPeers(sortField: unknown, order: string): unknown;
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
      sortPeers: (sortField: keyof Peer, order: string) => {
         set((state) => ({
            peers: state.peers.sort((a, b) => {
               if (typeof a[sortField] === 'string' && typeof b[sortField] === 'string') {
                  return order === 'asc' ? a[sortField].localeCompare(b[sortField]) : b[sortField].localeCompare(a[sortField]);
               } else if (typeof a[sortField] === 'number' && typeof b[sortField] === 'number') {
                  return order === 'asc' ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
               } else {
                  return order === 'asc' ? a[sortField] > b[sortField] ? 1 : -1 : a[sortField] < b[sortField] ? 1 : -1;
               }
            })
         }));
      }
   }))
);