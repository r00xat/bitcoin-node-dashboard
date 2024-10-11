import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from './api/api';
import { IBaseApiStore, IPeer } from './types';

interface IPeerStore extends IBaseApiStore {
   allTimeUploadTraffic: number;
   allTimeDownloadTraffic: number;
   banned: number;
   peers: IPeer[];
   sortPeers(sortField: unknown, order: string): unknown;
}

export const usePeerStore = create<IPeerStore>()(
   devtools((set) => ({
      allTimeUploadTraffic: 0,
      allTimeDownloadTraffic: 0,
      banned: 0,
      peers: [],
      loading: false,
      fetch: async () => {
         set({ loading: true });
         await api.get('/bitcoin/peers')
            .then(({ data }) => {
               set({
                  allTimeUploadTraffic: data.allTimeUploadTraffic,
                  allTimeDownloadTraffic: data.allTimeDownloadTraffic,
                  banned: data.banned,
                  peers: data.peers,
                  loading: false
               });
            })
            .catch(() => {
               set({ loading: false });
            });
      },
      sortPeers: (sortField: keyof IPeer, order: string) => {
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