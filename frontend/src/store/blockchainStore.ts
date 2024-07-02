import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from './api/api';

type BlockchainStore = {
   chain: string;
   size: number;
   difficulty: number;
   hashRate: number;
   lastBlock: number;
   lastBlockTime: number;
   fetch(): unknown;
}

export const useBlockchainStore = create<BlockchainStore>()(
   devtools((set) => ({
      chain: '',
      size: 0,
      difficulty: 0,
      hashRate: 0,
      lastBlock: 0,
      lastBlockTime: 0,
      fetch: async () => {
         await api.get('/bitcoin/blockchain')
            .then(({ data }) => {
               set({
                  chain: data.chain,
                  size: data.size,
                  difficulty: data.difficulty,
                  hashRate: data.hashRate,
                  lastBlock: data.lastBlock,
                  lastBlockTime: data.lastBlockTime
               },
                  false,
                  'fetchBlockchainStore'
               );
            });
      },
   }))
);