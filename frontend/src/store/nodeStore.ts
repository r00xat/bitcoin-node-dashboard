import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from './api/api';

type NodeStore = {
   client: string;
   protocolVersion: number;
   port: number;
   services: string[];
   uptime: number;
   networks: {
      ipv4: boolean;
      ipv6: boolean;
      onion: boolean;
      i2p: boolean;
      cjdns: boolean;
   };
   fetch(): unknown;
}

export const useNodeStore = create<NodeStore>()(
   devtools((set) => ({
      client: '',
      protocolVersion: 0,
      port: 0,
      services: [],
      uptime: 0,
      networks: {
         ipv4: false,
         ipv6: false,
         onion: false,
         i2p: false,
         cjdns: false,
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
                        onion: data.networks.onion,
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