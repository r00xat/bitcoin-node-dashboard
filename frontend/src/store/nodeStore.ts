import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from './api/api';

type network = {
   available: boolean;
   address: string | undefined;
}

type NodeStore = {
   client: string;
   protocolVersion: number;
   port: number;
   services: string[];
   uptime: number;
   networks: {
      ipv4: network;
      ipv6: network;
      tor: network;
      i2p: network;
      cjdns: network;
   },
   fetch(): unknown;
}

const defaulNetwork = {
   available: false,
   address: undefined,
}

export const useNodeStore = create<NodeStore>()(
   devtools((set) => ({
      client: '',
      protocolVersion: 0,
      port: 0,
      services: [],
      uptime: 0,
      networks: {
         ipv4: defaulNetwork,
         ipv6: defaulNetwork,
         tor: defaulNetwork,
         i2p: defaulNetwork,
         cjdns: defaulNetwork,
      },
      fetch: async () => {
         await api.get('/bitcoin/node')
            .then(({data}) => {
               set({
                     client: data.client,
                     protocolVersion: data.protocolVersion,
                     port: data.port,
                     services: data.services,
                     uptime: data.uptime,
                     networks: {
                        ipv4: data.networks.ipv4,
                        ipv6: data.networks.ipv6,
                        tor: data.networks.tor,
                        i2p: data.networks.i2p,
                        cjdns: data.networks.cjdns,
                     },
                  },
                  false,
                  'fetchNodeStore'
               );
            });
      },
   }))
);