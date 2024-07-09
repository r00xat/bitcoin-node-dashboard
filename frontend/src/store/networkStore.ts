import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from './api/api';

type network = {
   available: boolean;
   address: string | undefined;
}

type NetworkStore = {
   totalBytesSent: number;
   uploadTarget: {
      target: number;
      targetReached: boolean;
   },
   networks: {
      ipv4: network;
      ipv6: network;
      tor: network;
      i2p: network;
      cjdns: network;
   },
   loading: boolean;
   fetch(): unknown;
}

const defaultNetwork = {
   available: false,
   address: undefined,
}

export const useNetworkStore = create<NetworkStore>()(
   devtools((set) => ({
      totalBytesSent: 0,
      uploadTarget: {
         target: 0,
         targetReached: false,
      },
      networks: {
         ipv4: defaultNetwork,
         ipv6: defaultNetwork,
         tor: defaultNetwork,
         i2p: defaultNetwork,
         cjdns: defaultNetwork,
      },
      loading: false,
      fetch: async () => {
         set({ loading: true });
         await api.get('/bitcoin/network')
            .then(({data}) => {
               set({
                     totalBytesSent: data.totalBytesSent,
                     uploadTarget: {
                        target: data.uploadtarget.target,
                        targetReached: data.uploadtarget.target_reached,
                     },
                     networks: {
                        ipv4: data.networks.ipv4,
                        ipv6: data.networks.ipv6,
                        tor: data.networks.tor,
                        i2p: data.networks.i2p,
                        cjdns: data.networks.cjdns,
                     },
                     loading: false
                  },
                  false,
               );
            })
            .catch(() => {
               set({ loading: false });
            });
      },
   }))
);
