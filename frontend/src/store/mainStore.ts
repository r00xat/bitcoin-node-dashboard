import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from './api/api';
import { IBaseApiStore } from './types';

interface IMainStore extends IBaseApiStore {
   totalConnections: number;
   totalUploadTraffic: number;
   totalDownloadTraffic: number;
   bannedPeers: number;
   txInMeempool: number;
   latestBlock: number;
}

export const useMainStore = create<IMainStore>()(
   devtools((set) => ({
      totalConnections: 0,
      totalUploadTraffic: 0,
      totalDownloadTraffic: 0,
      bannedPeers: 0,
      txInMeempool: 0,
      latestBlock: 0,
      loading: false,
      fetch: async () => {
         set({loading: true});
         await api.get('/bitcoin/main')
            .then(({data}) => {
               set({
                     totalConnections: data.connections,
                     totalUploadTraffic: data.sent,
                     totalDownloadTraffic: data.received,
                     bannedPeers: data.bannedPeersCount,
                     txInMeempool: data.mempool,
                     latestBlock: data.blocks,
                     loading: false
                  },
                  false,
                  'fetchMainStore'
               );
            })
            .catch(() => {
               set({loading: false});
            });
      },
   }))
);
