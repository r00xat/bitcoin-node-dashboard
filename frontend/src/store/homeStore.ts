import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from './api/api';
import { IBaseApiStore, IBlockchainStore, IMainStore, INetworkInfo, INodeStore, IPeer } from './types';

interface IHomeStore extends IBaseApiStore {
   main: IMainStore;
   node: INodeStore;
   blockchain: IBlockchainStore;
   networkInfo: INetworkInfo;
   peers: IPeer[];
}

type HomeStoreWithoutApi = Omit<IHomeStore, keyof IBaseApiStore>;

const defaultHomeStore: HomeStoreWithoutApi = {
   main: {
      totalConnections: 0,
      totalUploadTraffic: 0,
      totalDownloadTraffic: 0,
      txInMeempool: 0,
   },
   node: {
      client: '',
      protocolVersion: 0,
      port: 0,
      services: [],
      uptime: 0,
   },
   blockchain: {
      chain: '',
      size: 0,
      difficulty: 0,
      hashRate: 0,
      lastBlock: 0,
      lastBlockTime: 0,
   },
   networkInfo: {
      uploadTarget: {
         target: 0,
         targetReached: false,
      },
      networks: {
         ipv4: {
            available: false,
            address: undefined,
         },
         ipv6: {
            available: false,
            address: undefined,
         },
         tor: {
            available: false,
            address: undefined,
         },
         i2p: {
            available: false,
            address: undefined,
         },
      },
   },
   peers: [],
};

export const useHomeStore = create<IHomeStore>()(
   devtools((set) => ({
      ...defaultHomeStore,
      loading: false,
      fetch: async () => {
         set({ loading: true });
         await api.get('/bitcoin/home')
            .then(({ data }) => {
               set({
                  main: {
                     totalConnections: data.main.totalConnections,
                     totalUploadTraffic: data.main.totalUploadTraffic,
                     totalDownloadTraffic: data.main.totalDownloadTraffic,
                     txInMeempool: data.main.txInMeempool,
                  },
                  node: {
                     client: data.node.client,
                     protocolVersion: data.node.protocolVersion,
                     port: data.node.port,
                     services: data.node.services,
                     uptime: data.node.uptime,
                  },
                  blockchain: {
                     chain: data.blockchain.chain,
                     size: data.blockchain.size,
                     difficulty: data.blockchain.difficulty,
                     hashRate: data.blockchain.hashRate,
                     lastBlock: data.blockchain.lastBlock,
                     lastBlockTime: data.blockchain.lastBlockTime,
                  },
                  networkInfo: {
                     uploadTarget: {
                        target: data.networkInfo.uploadTarget.target,
                        targetReached: data.networkInfo.uploadTarget.targetReached,
                     },
                     networks: {
                        ipv4: data.networkInfo.networks.ipv4,
                        ipv6: data.networkInfo.networks.ipv6,
                        tor: data.networkInfo.networks.tor,
                        i2p: data.networkInfo.networks.i2p,
                     },
                  },
                  peers: data.peers,
                  loading: false
               })
            })
            .catch(() => {
               set({ loading: false });
            });
      }
   }))
);
